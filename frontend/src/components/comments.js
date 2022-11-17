import React from 'react';
import { Link } from 'react-router-dom';

const Comment = ({comment}) => {

    const formatDate = com_date => {
        const date = new Date(com_date);
        return date.toDateString();

    };

    return (
        <li>
            <p>{ comment.body }</p>
            <p>{ comment.username }</p>
            <p>{ formatDate(comment.updated_date) }</p>
        </li>
    );
};

export default Comment;