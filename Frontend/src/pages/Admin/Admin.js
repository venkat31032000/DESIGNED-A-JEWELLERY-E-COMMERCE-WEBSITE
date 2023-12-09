import React, { useEffect, useState } from 'react'
import { IoMdAdd, IoMdRemove } from 'react-icons/io'
import '../../styles/admin.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../../actions';
import { updateProduct } from '../../actions';
import { deleteProduct } from '../../actions';
import '../../styles/sidebar.css'
import { FaHome, FaTimes, FaPlus, FaTrash } from 'react-icons/fa'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FiLogOut } from 'react-icons/fi'
import { logout } from '../../actions/auth'
import { HiMenuAlt1 } from 'react-icons/hi'
import logo from '../../assets/logo.png'

const Admin = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const allProducts = useSelector(state => state.allProducts)
    const { data } = allProducts
    const [show, showSideBar] = useState(useSelector(state => state.sidebar.show))
    const location = useLocation()
    const path = location.pathname
    const user = useSelector(state => state.user.user)

    useEffect(() => {
        dispatch(fetchAllProducts())
    }, [])

    const increaseQty = (item) => {
        dispatch(updateProduct(item._id, item.countInStock + 1))
    }
    const decreaseQty = (item) => {
        dispatch(updateProduct(item._id, item.countInStock - 1))
    }

    const handleDelete = (item) => {
        dispatch(deleteProduct(item._id))
    }

    const handleSignOut = () => {
        dispatch(logout())
        navigate('/')
    }

    return (
        <>
            <div className={`sidebar  ${show && 'showSideBar'}`}  >
                <div className="close" onClick={() => dispatch(showSideBar(false))}>
                    <FaTimes />
                </div>
                <div className="top-icons">
                    <Link to="/admin"><div className={`icon ${path === '/admin' && 'active'}`}>
                        <FaHome />
                    </div></Link>
                    <Link to="/addProduct"><div className={`icon ${path === '/addProduct' && 'active'}`}>
                        <FaPlus />
                    </div></Link>
                </div>
                <div className="bottom-icon">
                    {user && (<div className="icon" onClick={handleSignOut}>
                        <FiLogOut />
                    </div>)}
                </div>
            </div>
            <div className='mainarea admin'>
                <div className='header'>
                    <div className="logo">
                        <div className="burger" onClick={() => dispatch(showSideBar(true))}>
                            <HiMenuAlt1 />
                        </div>
                        <Link to="/"><img src={logo} alt="logo" /></Link>
                    </div>
                    <span style={{ fontSize: "30px", color: "rgb(17, 43, 76)" }}>Hello, {JSON.parse(localStorage.getItem("User")).name}</span>
                </div>

                <div className="mainarea admin-items">
                    <div className="admin-item">
                        <p style={{ width: "10%", textAlign: "center" }}>Image</p>
                        <p style={{ width: "10%", textAlign: "center" }}>Name</p>
                        <p style={{ width: "10%", textAlign: "center" }}>Stock</p>
                        <p style={{ width: "10%", textAlign: "center" }}>Count</p>
                        <p style={{ width: "10%", textAlign: "center" }}>Delete</p>
                    </div>
                    {
                        data.map((item) => (
                            <div className='admin-item' key={item.name}>
                                <div style={{ width: "10%", textAlign: "center" }}><img src={item.image} alt="" /></div>
                                <div style={{ width: "10%", textAlign: "center" }}><p>{item.name}</p></div>
                                <div style={{ width: "10%", textAlign: "center" }}><p>{item.countInStock ? "In Stock" : "Out of Stock"}</p></div>
                                <div className='handleBtn' style={{ width: "10%", textAlign: "center" }}>
                                    <div className='btn' onClick={() => decreaseQty(item)}><IoMdRemove /></div>
                                    <p>{item.countInStock}</p>
                                    <div className='btn' onClick={() => increaseQty(item)}><IoMdAdd /></div>
                                </div>
                                <div style={{ width: "10%", textAlign: "center" }} onClick={() => handleDelete(item)}><FaTrash /></div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Admin