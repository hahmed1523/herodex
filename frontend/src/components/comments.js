import React from 'react';
import { Link } from 'react-router-dom';

const Comment = ({comment}) => {
    return (
        <li>
            <p>{ comment.body }</p>
            <p>{ comment.username }</p>
            <p>{ comment.updated_date }</p>
        </li>
    );
};

export default Comment;