import React from 'react';
import { Link } from 'react-router-dom';

const HeroItem = ({hero}) => {

    const handleLike = async () => {
        
    };

    return (
        <li>
            <Link to={`/hero/${hero.id}`}>
                <p>{ hero.name }</p>
            </Link>
            <p>{ hero.famous_from }</p>
            <p>Likes: { hero.likes }</p>
        </li>
    );
};

export default HeroItem;