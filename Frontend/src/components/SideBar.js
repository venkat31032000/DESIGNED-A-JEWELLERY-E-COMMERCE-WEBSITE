import React ,{useState}from 'react'
import '../styles/sidebar.css'
import {FaHome,FaTimes} from 'react-icons/fa'
import {BsGear} from 'react-icons/bs'
import {MdOutlineFoodBank} from 'react-icons/md'
import {CgFileDocument, CgFeed} from 'react-icons/cg'
import { Link,useLocation } from 'react-router-dom'
import {FiLogOut} from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/auth'
import { showSideBar } from '../actions'

const SideBar = () => {
       const dispatch =useDispatch()
       const user = useSelector(state=>state.user.user)
       const show =useSelector(state=>state.sidebar.show)
       const location =useLocation()
       const path =location.pathname

    const handleSignOut =()=>{
          dispatch(logout())
    }
    return (
        <div className={`sidebar  ${show&&'showSideBar'}`}  >
            <div className="close" onClick={()=>dispatch(showSideBar(false))}>
                <FaTimes/>
            </div>
            <div className="top-icons">
            <Link to="/"><div className={`icon ${path==='/'&&'active'}`}>
                <FaHome/>
            </div></Link>
            
            {/* <Link to='/recipes'> <div className={`icon ${path==='/recipes'&&'active'}`}> */}
                {/* <MdOutlineFoodBank/> */}
            {/* </div></Link> */}
            
            <Link to='/dashboard'> <div className={`icon ${path==='/dashboard'&&'active'}`}>
                <CgFeed/>
            </div></Link>
           
           <Link to="/your-address"> <div className={`icon ${path==='/your-address'&&'active'}`}>
                <CgFileDocument/>
            </div></Link>
           
            <Link to='/profile'><div className={`icon ${path==='/profile'&&'active'}`}>
                <BsGear/>
            </div></Link>
            </div>
            <div className="bottom-icon">
            {user&&(<div className="icon" onClick={handleSignOut}>
            <FiLogOut/>
            </div>)}
            </div>
        </div>
    )
}

export default SideBar
