import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Comment = ({comment, setComments}) => {

    const navigate = useNavigate();

    const formatDate = com_date => {
        const date = new Date(com_date);
        return date.toDateString();

    };

    return (
        <li>
            <p>{ comment.body }</p>
            <p>{ comment.username }</p>
            <p>{ formatDate(comment.updated_date) }</p>
            <Link to={`/comments/update/${comment.id}`}>Update</Link>

            <Link className='delete-btn' to={`/comments/delete/${comment.id}`}>Delete</Link>
            
        </li>
    );
};

export default Comment;