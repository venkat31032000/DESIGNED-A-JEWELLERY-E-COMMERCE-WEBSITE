import React, { useEffect, useState } from 'react';
import '../../styles/auth.css';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../components/Spinner'
import { resetPassword } from '../../actions/auth';
import logo from '../../assets/logo.png'

const Signup = () => {
    const [isLoading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const responseMsg = useSelector(state => state.resetUserPassword)
    const location = useLocation()
    const navigate = useNavigate()
    // const userInfo = user?.user;
    // const redirect = location.search ? `/${location.search.split('=')[1]}` : '/';
    const params = useParams();

    //form validation
    let schema = yup.object().shape({
        password: yup.string().required("Please Enter your password")
            .test(
                "regex",
                "Password must be min 6 characters, and have 1 Special Character, 1 Uppercase, 1 Number and 1 Lowercase",
                val => {
                    let regExp = new RegExp(
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/
                    )
                    return regExp.test(val);
                })

    })


    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    })

    const submitHandler = (data) => {
        dispatch(resetPassword(params.id, params.token, data.password))
        setLoading(true)
    }

    useEffect(() => {
        if(responseMsg?.user){
            navigate('/signin')
        }
    }, [responseMsg])

    return (
        <div className='auth'>
            <div className="form">
                <div className="logo">
                    <img src={logo} alt="" />
                </div>
                {/* {user?.error && (<div className="err">
                    {user?.error}
                </div>)} */}
                <form onSubmit={handleSubmit(submitHandler)}>
                    <input type="password" name="password" id="" placeholder='Password' {...register('password', { required: true })} />
                    {errors?.password?.message && <p className="err">{errors?.password?.message}</p>}
                    {responseMsg?.user && <p style={{color: "green"}}>{responseMsg?.user?.message}</p>}
                    <button type="submit">{'Reset Password'}</button>
                </form>
            </div>
        </div>
    )
}

export default Signup
