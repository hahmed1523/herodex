import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroItem from '../components/heroItem';


const HomePage = () => {

    let [heroes, setHeroes] = useState([]);

    useEffect(() => {
        getHeroes();
    }, [])

    const getHeroes = async () => {
        const response = await fetch('/api/heroes/');
        const data = await response.json();
        setHeroes(data);
    }

    return (
        <div>
            <h2>Heroes</h2>

            <Link to={'/hero/create'}>Add Hero</ Link>

            <ul className='hero-list'>
                {
                    heroes.map((hero, index) => (
                        <HeroItem key={index} hero={hero} />
                    ))
                }
            </ul>

        </div>
    );
};

export default HomePage;