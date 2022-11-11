import React from 'react';
import { Link } from 'react-router-dom';

const MoveItem = ({move}) => {
    return (
        <li>
            <Link >
                <p>{ move.name }</p>
            </Link>
        </li>
    );
};

export default MoveItem;