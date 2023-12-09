import React, { useState } from 'react';
import '../../styles/sidebar.css'
import { FaHome, FaTimes, FaPlus } from 'react-icons/fa'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FiLogOut } from 'react-icons/fi'
import { logout } from '../../actions/auth'
import { HiMenuAlt1 } from 'react-icons/hi'
import logo from '../../assets/logo.png'
import { useDispatch, useSelector } from 'react-redux';
import '../../styles/profile.css';
import { addProduct } from '../../actions';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";


const Profile = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [show, showSideBar] = useState(useSelector(state => state.sidebar.show))
    const [name, setName] = useState('')
    const [image, setImage] = useState(null)
    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState(0)
    const [type, setType] = useState('')
    const [category, setCategory] = useState('')
    const [count, setCount] = useState(0)
    const [imageAsFile, setImageAsFile] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const location = useLocation()
    const path = location.pathname
    const user = useSelector(state => state.user.user)

    const handleSignOut = () => {
        dispatch(logout())
        navigate('/')
    }

    const handleImageAsFile = (e) => {
        const img = e.target.files[0]
        setImageAsFile(img)
    }

    const uploadImage = () => {
        const file = imageAsFile;
        if (!file) return;
        const storageRef = ref(storage, `${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                console.log(snapshot);
            },
            (error) => {
                alert(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImage(downloadURL);
                });
            }
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addProduct(name, image, desc, price, type, category, count))
        setSuccessMessage("Product Added Successfully")
        setName('')
        setImage(null)
        setDesc('')
        setPrice(0)
        setCategory('')
        setCount(0)
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
                    <h1 style={{ color: "rgb(17, 43, 76", textAlign: "center", marginTop: "0px" }}>Add Product</h1>
                    <div className="admin-item" style={{ width: "25em", marginLeft: "auto", marginRight: "auto", marginTop: "20px", justifyContent: "space-evenly" }}>
                        <form onSubmit={e => handleSubmit(e)}>
                            <div className="profile-input">
                                Name: <input type="text" id='name' name='name' required value={name} onChange={e => setName(e.target.value)} />
                            </div>
                            <div className="profile-input">
                                Image: <input type="file" id='image' name="image" style={{ display: "block" }} required onChange={handleImageAsFile} />
                                <button onClick={uploadImage}>Upload</button>
                            </div>
                            <div className="profile-input">
                                Description: <input type="text" name="desc" id='desc' required value={desc} onChange={e => setDesc(e.target.value)} />
                            </div>
                            <div className="profile-input">
                                Price: <input type="number" id='price' name='price' required value={price} onChange={e => setPrice(e.target.value)} />
                            </div>
                            <div className="profile-input" style={{ marginTop: "10px" }}>
                                Type: <input type="radio" name='category' id='Veg' value='Veg' style={{ width: "fit-content", marginLeft: "20px" }} required onChange={e => setType(e.target.value)} /> Veg
                                <input type="radio" name='category' id='Non Veg' value='Non Veg' style={{ width: "fit-content", marginLeft: "30px" }} onChange={e => setType(e.target.value)} /> Non Veg
                            </div>
                            <div className="profile-input" style={{ marginTop: "10px" }}>
                                Category:
                                <select name="category" id="category" required value={category} onChange={e => setCategory(e.target.value)}>
                                    <option value="">Select the category</option>
                                    <option value="pizza">Pizza</option>
                                    <option value="Burger">Burger</option>
                                    <option value="Sandwich">Sandwich</option>
                                    <option value="Smoothy">Smoothy</option>
                                    <option value="Snaks">Snacks</option>
                                    <option value="Drink">Drink</option>
                                </select>
                            </div>
                            <div className="profile-input">
                                Count in stock: <input type="number" id='countInStock' name='counrInStock' required value={count} onChange={e => setCount(e.target.value)} />
                            </div>
                            {<button type='submit'>Add Product</button>}
                            {successMessage ? <h3 style={{ color: "green" }}>{successMessage}</h3> : <></>}
                        </form>
                    </div>
                </div>

            </div>

        </>
    );
};

export default Profile;
