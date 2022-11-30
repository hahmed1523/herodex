import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {

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
                    <Link to='/login'>Login</Link>
                </section>
            </nav>
        </header>
    );
};

export default Header;