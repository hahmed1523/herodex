import React from 'react';
import { Link } from 'react-router-dom';

const HeroItem = ({hero}) => {
    return (
        <li>
            <Link to={`/hero/${hero.id}`}>
                <p>{ hero.name }</p>
            </Link>
            <p>{ hero.famous_from }</p>
        </li>
    );
};

export default HeroItem;