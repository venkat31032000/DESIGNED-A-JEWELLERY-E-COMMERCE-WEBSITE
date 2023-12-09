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
                    <img src="data:image/jpeg;base64,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" alt="" />
                </div>
                <div className="text">
                    <h4> <span></span></h4>
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
