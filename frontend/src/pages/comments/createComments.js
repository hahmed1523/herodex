import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const CreateCommentsPage = ({heroId}) => {
    let navigate = useNavigate();

    const commentId = useParams().comment_id;

    let [comment, setComment] = useState({
        'body': '',
        'hero': heroId,
        'user': 1
    });

    let [errors, setErrors] = useState([]);

    const update = field => {
        const name = field;
        return e => setComment({
            ...comment,
            [name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        let response = null;
        
        response = await fetch('/api/comments/',{
            method: "POST",
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        });

        const data = await response.json();

        if(response.status !== 200){
            setErrors(data);

        } else {
            // navigate(`/hero/${heroId.toString()}`);
        }
    }

    return(
        <div>
            <h3>Add a comment</h3>

            {errors ? <ul className='errors'>{Object.entries(errors).map((entry, idx) => {
                return(
                    <li key={idx}>{entry[0].charAt(0).toUpperCase() + entry[0].slice(1)}: {entry[1]}</li>
                )
            })}</ul> : null }

            <form className='add-comment'
                    onSubmit={handleSubmit}>
                <textarea name="body"
                    value={comment.body}
                    onChange={update('body')}
                    ></textarea>
                <input type='submit' value='Add'/>
            </form>
            
        </div>
    )
};

export default CreateCommentsPage;