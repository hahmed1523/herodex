import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/auth_context';


const Header = () => {

    let {user, logoutUser} = useContext(AuthContext);

    return (
        <header>
            <Link to='/' className='logo'>
                <h1>HeroDex</h1>
            </Link>

            <nav>
                <section className='links-section'>
                    <Link to='/heroesfrom'>Hero Sources</Link>
                    <Link to='/moves'>Move List</Link>
                </section>

                <section className='login-section'>
                    {user ? (
                        <div>
                            <p>Hello {user.username}</p>
                            <button onClick={logoutUser}>Logout</button>
                        </div>

                    ):
                    (
                        <div className='header-links'>
                            <Link to='/login'>Login</Link>
                            <Link to='/register'>Register</Link>
                        </div>
                        
                    )}
                    
                </section>
            </nav>
        </header>
    );
};

export default Header;