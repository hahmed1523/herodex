import React, {useState, useEffect, useContext} from 'react';
import { useParams, Link, useNavigate, Routes, Route } from 'react-router-dom';
import CommentIndexPage from '../comments/commentsIndex';
import CreateCommentsPage from '../comments/createComments';
import AuthContext from '../../context/auth_context';

const HeroPage = () => {

    let {authTokens, logoutUser} = useContext(AuthContext);

    let navigate = useNavigate();

    const heroId = useParams().id;
    
    let [hero, setHero] = useState([]);


    useEffect(() => {
        getHero();
    }, [heroId])

    const getHero = async () => {
        let response = null;
        if (authTokens) {
            response = await fetch(`/api/heroes/${heroId}`,{
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access)
                },
            });
        } else {
            response = await fetch(`/api/heroes/${heroId}`);
        }
        
        const data = await response.json();
        setHero(data);
    }

    const handleDelete = async () => {
        const response = await fetch(`/api/heroes/${heroId}/`,{
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            },

        });

        const data = await response.json();

        navigate('/')

    }

    return(
        <div>
            <h2>{hero?.name}</h2>
            <p>Likes: {hero?.likes}</p>
            <p>Famous From: {hero?.famous_from}</p>
            <p>Description: {hero?.description}</p>
            <p>Primary Move: {hero?.move1}</p>
            <p>Secondary Move: {hero?.move2}</p>

            <Link to={`/hero/update/${hero?.id}`} className='btn'>Update</Link>
            <button className='delete-btn' onClick={handleDelete}>Delete</button>
            
            <CommentIndexPage heroId={heroId} />
            {console.log(hero)}

        </div>
    );
};

export default HeroPage;