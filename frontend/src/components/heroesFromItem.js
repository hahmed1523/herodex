import React from 'react';
import { Link } from 'react-router-dom';

const SourceItem = ({source}) => {
    return (
        <li>
            <Link to={`/hero/${source.id}`}>
                <p>{ source.name }</p>
            </Link>
            <p>Origin Date: { source.origin_date }</p>
            <p>Created By: { source.created_by }</p>
        </li>
    );
};

export default SourceItem;