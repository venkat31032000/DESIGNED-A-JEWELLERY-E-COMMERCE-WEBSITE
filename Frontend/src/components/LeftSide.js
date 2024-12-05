import React from 'react'
import '../styles/leftside.css'
import { BsCart3, BsFillArrowRightSquareFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import CartItemCard from './CartItemCard'
const LeftSide = ({ data, show }) => {
    const cartItems = useSelector(state => state.cart.cartItems)
    const user = useSelector(state => state.user)

    return (
        <div className='leftside'>
            <div className="leftHeader">
                <div className="user-info">
                    {
                        user?.user ? (
                            <Link to="/profile"> <div className='user-profile-icon'>{user.user.name.charAt(0)}</div></Link>
                        ) : (
                            <Link to="/signin"> <button>Login</button></Link>
                        )
                    }
                </div>
                <Link to="/cart"><div className="icon">
                    <span>{cartItems ? cartItems?.length : 0}</span>
                    <BsCart3 />
                </div></Link>
            </div>
            {show ? null : (<div className="sidebar-msg">
                <div className="img">
                    <img src="https://cdni.iconscout.com/illustration/premium/thumb/delivery-man-delivering-parcel-3918090-3259201.png" alt="" />
                </div>
                <div className="text">
                    <h4>Safe Delivery <span>@</span> your doors</h4>
                </div>
            </div>)}
            {show ? null : (<div className="side-cart-area">
                <div className="text">
                    <h4>Order Menu</h4>
                    <Link to='/cart'><p>View All <BsFillArrowRightSquareFill /></p></Link>
                </div>
                <div className='cart-area'>
                    <div className="all-items side-cart">
                        {cartItems.slice(0, 3).map((item) => (
                            <CartItemCard key={item.product} item={item} />
                        ))}
                        {cartItems.length > 0 && <Link to="/cart"><button>PROCEED TO CHECKOUT</button></Link>}
                    </div>
                </div>
            </div>)}
        </div>
    )
}

export default LeftSide
