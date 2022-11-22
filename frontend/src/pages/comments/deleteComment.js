import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const DeleteCommentPage = () => {

    const navigate = useNavigate();
    const commentId = useParams().comment_id;

    let [comment, setComment] = useState([]);

    useEffect( () => {
        getComment();
    }, [commentId]);

    const getComment = async () => {
        const response = await fetch(`/api/comments/${commentId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        setComment(data);

    }

    const handleDelete = async () => {
        const response = await fetch(`/api/comments/${comment.id}/`,{
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },

        });

        const data = await response.json();

        navigate(-1);

    }

    const handleBack = () => {
        navigate(-1);
    }

    return(
        <div>
            <h2>Are you sure you want to delete this comment?</h2>

            <p>{comment?.body}</p>

            <button className='btn delete-btn' onClick={handleDelete}>Delete</button>
            <button className='btn' onClick={handleBack}>Back</button>

        </div>
    )
};

export default DeleteCommentPage;