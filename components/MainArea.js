import React, { useState } from 'react'
import '../styles/mainarea.css'
import Header from './Header'
import chains from '../assets/chains.png'
import bangles from '../assets/bangles.png'
import rings from '../assets/rings.png'
import earrings from '../assets/earrings.png'
import longchains from '../assets/longchain.png'
import necklaces from '../assets/necklace.png'


import Product from './products/Product'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const MainArea = () => {
    const user = useSelector(state => state.user)
    const [category, setCategory] = useState('pizza')

    return (
        <div className='mainarea'>
            <Header />
            <div className="banner">
                <div className="text">
                    <h3>Hello {user?.user?.name}</h3>
                    <p>Get Free delivery on <span>$200</span>  and above</p>
                    <Link to="/cart"><button>Order Now!</button></Link>
                </div>
                <div className="img">
                    <img src="https://www.giva.co/cdn/shop/files/59-_Hero_banner_PHONE_gold_anushka__1_-min_2f4144e8-4d06-4586-becd-87bf0ad6ec97.jpg?v=1698257506&width=900" alt="" />
                </div>
            </div>

            {/* category area */}
            <div className='category-area'>
                <h4>Menu</h4>
                <div className="category">
                    <div className={`cat-icon ${category === 'pizza' && 'active'} `} onClick={() => setCategory('pizza')}>
                        <div className="img">

                            <img src={bangles} alt="pizza" />
                        </div>
                        <div className="text">
                            Bangles
                        </div>

                    </div>
                    <div className={`cat-icon  ${category === 'Burger' && 'active'} `} onClick={() => setCategory('Burger')}>
                        <div className="img">

                            <img src={chains} alt="pizza" />
                        </div>
                        <div className="text">
                            Chains
                        </div>

                    </div>
                    <div className={`cat-icon  ${category === 'Sandwich' && 'active'} `} onClick={() => setCategory('Sandwich')}>
                        <div className="img">

                            <img src={rings} alt="pizza" />
                        </div>
                        <div className="text">
                            Rings
                        </div>

                    </div>
                    <div className={`cat-icon  ${category === 'Smoothy' && 'active'} `} onClick={() => setCategory('Smoothy')}>
                        <div className="img">

                            <img src={earrings} alt="pizza" />
                        </div>
                        <div className="text">
                            Earrings
                        </div>

                    </div>
                    <div className={`cat-icon  ${category === 'Snaks' && 'active'} `} onClick={() => setCategory('Snaks')}>
                        <div className="img">

                            <img src={longchains} alt="pizza" />
                        </div>
                        <div className="text">
                             chokers
                        </div>

                    </div>
                    <div className={`cat-icon  ${category === 'Drink' && 'active'} `} onClick={() => setCategory('Drink')}>
                        <div className="img">

                            <img src={necklaces} alt="pizza" />
                        </div>
                        <div className="text">
                            Necklaces
                        </div>

                    </div>
                </div>
                <div className="all-list">
                    <Product category={category} />
                </div>
            </div>


        </div>
    )
}

export default MainArea
