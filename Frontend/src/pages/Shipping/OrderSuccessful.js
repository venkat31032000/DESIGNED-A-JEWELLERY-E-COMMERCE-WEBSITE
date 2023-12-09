import React from 'react';
import SideBar from '../../components/SideBar';
import image from '../../assets/orderSuccess.jpeg'
import HeaderLogo from '../../components/HeaderLogo';

function OrderSuccessful() {
    return ( 
        <div>
            <SideBar />
            <HeaderLogo title=""/>
            <div className='ordersuccess-card'>
                <img src={image} alt="order-success" />
                <br/>
                <h2>Order has been placed successfully!</h2>
            </div>
        </div>
     );
}

export default OrderSuccessful;