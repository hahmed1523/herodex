import React, {useState, useEffect} from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import CommentIndexPage from '../comments/commentsIndex';

const HeroPage = () => {

    let navigate = useNavigate();

    const heroId = useParams().id;
    
    let [hero, setHero] = useState([]);


    useEffect(() => {
        getHero();
    }, [heroId])

    const getHero = async () => {
        const response = await fetch(`/api/heroes/${heroId}`);
        const data = await response.json();
        setHero(data);
    }

    const handleDelete = async () => {
        const response = await fetch(`/api/heroes/${heroId}/`,{
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },

        });

        const data = await response.json();

        navigate('/')

    }

    return(
        <div>
            <h2>{hero?.name}</h2>
            <p>Famous From: {hero?.famous_from}</p>
            <p>Description: {hero?.description}</p>
            <p>Primary Move: {hero?.move1}</p>
            <p>Secondary Move: {hero?.move2}</p>

            <Link to={`/hero/update/${hero?.id}`} className='btn'>Update</Link>
            <button className='delete-btn' onClick={handleDelete}>Delete</button>

            <CommentIndexPage heroId={heroId} />

        </div>
    );
};

export default HeroPage;