import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/shipping.css';
import SideBar from '../../components/SideBar'
import foodzilla from "../../apis/foodzilla"
import HeaderLogo from '../../components/HeaderLogo';

const Payment = () => {
  const location = useLocation();
  const path = location.pathname
  const navigate = useNavigate()
  const user = useSelector(state => state.user.user)
  const cartItems = useSelector(state => state.cart.cartItems)
  const cartPrice = cartItems.reduce((total, itm) => total + itm?.price * itm?.qty, 0)
  const deleviryPrice = (cartPrice > 100 || cartPrice === 0) ? 0 : 5
  const discount = 0;
  const totalPrice = (cartPrice + deleviryPrice) - discount;
  const [paymentType, setPaymentType] = useState('COD')
  const handlePlaceOrder = async () => {
    if (paymentType === "stripe") {
      const data = await foodzilla.get(`/api/products/payment/${totalPrice}`);
      window.open(data.data, '_blank');
      navigate('/order')
    } else {
      navigate('/order')
    }
  }

  useEffect(() => {
    if (!user) {
      navigate('/signin')
    }
  }, [])

  return (
    <>
      <SideBar />
      <HeaderLogo title="Payment" />
      <div className='shipping'>
        <div className="progress">
          <div className="status">
            <p>Bag</p>
            <div className={`divider`}></div>
            <p className={` ${path === '/shipping' && 'active'}`}>Shipping</p>
            <div className="divider"></div>
            <p className={` ${path === '/payment' && 'active'}`}>Payment</p>
            <div className="divider"></div>
            <p className={` ${path === '/order' && 'active'}`}>Order</p>

          </div>
        </div>
        <div className="shipping-details">
          <div className="address">
            <h3>Select Payment type</h3>
            <div className="payments-opts">
              <div className="payment-method">
                <div className='select-opt' onClick={() => setPaymentType("COD")}>
                  <input type="radio" value="COD" name="payment" className='pay' id="cod" checked />
                  <label htmlFor="cod">CASH ON DELIVERY</label>
                </div>
                <div className='select-opt' onClick={() => setPaymentType("stripe")}>
                  <input type="radio" value="paypal" name="payment" className='pay' id="paypal" />
                  <label htmlFor="paypal">STRIPE</label>
                </div>

              </div>
            </div>
          </div>
          <div className="checkout-area">
            <div className="billing">
              <h4>PRICE DETAILS</h4>
              <div className="details">
                <div className="item">
                  <p>Price</p>
                  <p><span>$</span>{cartPrice}</p>
                </div>
                <div className="item">
                  <p>Discount</p>
                  <p>-<span>$</span>{discount}</p>
                </div>
                <div className="item">
                  <p>Delivery Charges</p>
                  <p>{deleviryPrice === 0 ? <span className='free'>Free</span> : <span>${deleviryPrice}</span>}</p>
                </div>
              </div>
              <div className="total">
                <h3>Total</h3>
                <h3><span>$</span>{totalPrice}</h3>
              </div>
            </div>
            <button onClick={handlePlaceOrder} disabled={totalPrice === 0 ? true : false}>CONTINUE</button>
          </div>
        </div>

      </div>
    </>
  );
};

export default Payment;
