import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

const HeroPage = () => {

    const heroId = useParams().id;
    
    let [hero, setHero] = useState([]);

    useEffect(() => {
        getHero();
    }, [heroId])

    const getHero = async () => {
        const response = await fetch(`/api/heroes/${heroId}`);
        const data = await response.json();
        setHero(data);
    }

    return(
        <div>
            <h2>{hero?.name}</h2>
            <p>Famous From: {hero?.famous_from}</p>
            <p>Description: {hero?.description}</p>
            <p>Primary Move: {hero?.move1}</p>
            <p>Secondary Move: {hero?.move2}</p>
        </div>
    );
};

export default HeroPage;