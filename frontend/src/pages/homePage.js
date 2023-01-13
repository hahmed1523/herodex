import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import HeroItem from '../components/heroItem';
import AuthContext from '../context/auth_context';


const HomePage = () => {

    let {authTokens} = useContext(AuthContext);

    let [heroes, setHeroes] = useState([]);

    useEffect(() => {
        getHeroes();
    }, [])

    const getHeroes = async () => {
        let response = null;
        if (authTokens){
            response = await fetch('/api/heroes/',{
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access)
                 },
            });
        } else {
            response = await fetch('/api/heroes/')
        }

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
                        <HeroItem key={index} hero={hero}  authTokens={authTokens}/>
                    ))
                }
            </ul>

        </div>
    );
};

export default HomePage;