import React, { useState } from 'react';
import '../../styles/auth.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../components/Spinner'
import { forgotPassword } from '../../actions/auth';
import logo from '../../assets/logo.png'

const Signup = () => {
    const [isLoading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const responseMsg = useSelector(state => state.forgotPasswordlink)
    const location = useLocation()
    const navigate = useNavigate()
    // const userInfo = user?.user;
    // const redirect = location.search ? `/${location.search.split('=')[1]}` : '/';

    //form validation
    let schema = yup.object().shape({
        email: yup.string().required("Please Enter your Email").email(),
    })


    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    })

    const submitHandler = (data) => {
        dispatch(forgotPassword(data.email))
        setLoading(true)
    }


    return (
        <div className='auth'>
            <div className="form">
                <div className="logo">
                    <img src={logo} alt="" />
                </div>
                {responseMsg?.error && (<div className="err">
                    {responseMsg?.error}
                </div>)}
                <form onSubmit={handleSubmit(submitHandler)}>
                    <input type="email" name='email' placeholder='Email' {...register('email', { required: true })} />
                    {errors?.email?.message && <p className="err">{errors?.email?.message}</p>}
                    {responseMsg?.user && <p style={{color: "green"}}>{responseMsg?.user?.message}</p>}
                    <button type="submit">{'Send Reset Password link'}</button>
                </form>
            </div>
        </div>
    )
}

export default Signup
