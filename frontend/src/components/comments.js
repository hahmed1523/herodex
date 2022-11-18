import React from 'react';
import { Link } from 'react-router-dom';

const Comment = ({comment, setComments}) => {

    const formatDate = com_date => {
        const date = new Date(com_date);
        return date.toDateString();

    };

    const handleDelete = async () => {
        const response = await fetch(`/api/comments/${comment.id}/`,{
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },

        });

        const data = await response.json();

        navigate('/')

    }

    return (
        <li>
            <p>{ comment.body }</p>
            <p>{ comment.username }</p>
            <p>{ formatDate(comment.updated_date) }</p>
            <Link to={`/comments/update/${comment.id}`}>Update</Link>
            <button className='btn delete-btn'>Delete</button>
        </li>
    );
};

export default Comment;