import React from 'react';

const HeroItem = ({hero}) => {
    return (
        <li>
            <p>{ hero.name }</p>
            <p>{ hero.famous_from }</p>
        </li>
    );
};

export default HeroItem;