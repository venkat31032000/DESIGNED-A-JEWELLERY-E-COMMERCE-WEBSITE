import React from 'react';
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { showSideBar } from '../actions'
import { HiMenuAlt1 } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import '../styles/header.css'

function HeaderLogo(props) {

    const dispatch = useDispatch()
    return (
        <div className='header'>
            <div className="logo">
                <div className="burger" onClick={() => dispatch(showSideBar(true))}>
                    <HiMenuAlt1 />
                </div>
                <Link to="/"><img src={logo} alt="logo" /></Link>
            </div>
            <h2>{props.title}</h2>
        </div>
    );
}

export default HeaderLogo;