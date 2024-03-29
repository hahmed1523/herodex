import React, {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth_context';

const LoginPage = () => {

    const {loginUser} = useContext(AuthContext);

    return (
        <div className='login-page'>
            <h2>Login</h2>
            <form onSubmit={loginUser}>
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
            <Link to='/register'>Register?</Link>
        </div>
    )
};  

export default LoginPage;

