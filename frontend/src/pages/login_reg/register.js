import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';


const RegisterPage = () => {
    const navigate = useNavigate();

    let [regUser, setRegUser] = useState({
        "username": "",
        "email": "",
        "password": "",
        "password2": ""
    });

    let [errors, setErrors] = useState([]);

    const update = field => {
        const name = field;

        return e =>
                setRegUser({
                    ...regUser,
                    [name]: e.target.value
                })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/register/',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(regUser)
        });

        const data = await response.json();

        if(response.status !== 200){
            setErrors(data);
        } else {
            navigate('/login');
        }
    }
    
    return(
        <div className='register-page'>
            {errors ? <ul className='errors'>{Object.entries(errors).map((entry, idx) => {
                return(
                    <li key={idx}>{entry[0].charAt(0).toUpperCase() + entry[0].slice(1)}: {entry[1]}</li>
                )
            })}</ul> : null }

            <h2>Register</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name='username'
                    placeholder='Enter Username' 
                    onChange={update('username')}/>
                <input
                    type="text"
                    name='email'
                    placeholder='Enter Email' 
                    onChange={update('email')}/>
                <input
                    type="password"
                    name='password'
                    placeholder='Enter Password'
                    onChange={update('password')} />
                <input
                    type="password"
                    name='password2'
                    placeholder='Confirm Password' 
                    onChange={update('password2')}/>
                <input type="submit" />
            </form>
            <Link to='/login'>Login?</Link>
            
        </div>
    )

};

export default RegisterPage;