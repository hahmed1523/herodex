import React, {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth_context';


const RegisterPage = () => {

    const {loginUser} = useContext(AuthContext);

    return(
        <div className='register-page'>
            <h2>Register</h2>

            <form onSubmit={loginUser}>
                <input
                    type="text"
                    name='email'
                    placeholder='Enter Email' />
                <input
                    type="text"
                    name='username'
                    placeholder='Enter Username' />
                <input
                    type="password"
                    name='password'
                    placeholder='Enter Password' />
                <input type="submit" />
            </form>
            <Link to='/login'>Login?</Link>
        </div>
    )

};

export default RegisterPage;