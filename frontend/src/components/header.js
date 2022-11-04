import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <Link to='/' className='logo'>
                <h1>HeroDex</h1>
            </Link>

            <nav>
                <Link to='/heroesfrom'>Hero Sources</Link>
                <Link>Move List</Link>
            </nav>
        </header>
    );
};

export default Header;