import React, {useState, useEffect, useContext} from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/auth_context';

const HeroesFromPage = () => {

    let {authTokens, logoutUser} = useContext(AuthContext);

    let navigate = useNavigate();

    const heroesFromId = useParams().id;
    
    let [heroesfrom, setHeroesFrom] = useState([]);

    useEffect(() => {
        getHeroesFrom();
    }, [heroesFromId])

    const getHeroesFrom = async () => {
        const response = await fetch(`/api/heroesfrom/${heroesFromId}`);
        const data = await response.json();
        setHeroesFrom(data);
    }

    const handleDelete = async () => {
        const response = await fetch(`/api/heroesfrom/${heroesFromId}/`,{
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            },

        });

        const data = await response.json();

        navigate('/heroesfrom')

    }

    return(
        <div>
            <h2>{heroesfrom?.name}</h2>
            <p>Origin Date: {heroesfrom?.origin_date}</p>
            <p>Created By: {heroesfrom?.created_by}</p>

            <Link to={`/heroesfrom/update/${heroesfrom?.id}`} className='btn'>Update</Link>
            <button className='delete-btn' onClick={handleDelete}>Delete</button>

        </div>
    );
}

export default HeroesFromPage;