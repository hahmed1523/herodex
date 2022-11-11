import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SourceItem from '../../components/heroesFromItem';

const HeroesFromIndexPage = () => {

    let [heroesfrom, setHeroesFrom] = useState([]);

    useEffect(() => {
        getHeroesFrom();
    }, []);

    const getHeroesFrom = async () => {
        const response = await fetch('/api/heroesfrom/');
        const data = await response.json();
        setHeroesFrom(data);
    };

    return (
        <div>
            <h2>Hero Sources</h2>

            <Link to={'/heroesfrom/create'}>Add Hero Source</ Link>

            <ul className='heroesfrom-list'>
                {
                    heroesfrom?.map((source, index) => (
                        <SourceItem key={index} source={source} />
                    ))
                }
            </ul>

        </div>
    );
};

export default HeroesFromIndexPage;
