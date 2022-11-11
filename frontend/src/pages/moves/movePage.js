import React, {useState, useEffect} from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const MovePage = () => {

    let navigate = useNavigate();

    const moveId = useParams().id;
    
    let [move, setMove] = useState([]);

    useEffect(() => {
        getMove();
    }, [moveId])

    const getMove = async () => {
        const response = await fetch(`/api/moves/${moveId}`);
        const data = await response.json();
        setMove(data);
    }

    const handleDelete = async () => {
        const response = await fetch(`/api/moves/${moveId}/`,{
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },

        });

        const data = await response.json();

        navigate('/moves');
    };

    return(
        <div>

            <h2>{move?.name}</h2>

            <Link to={`/moves/update/${move.id}`} className='btn'>Update</Link>
            <button className='delete-btn' onClick={handleDelete}>Delete</button>
            

        </div>
    );

}

export default MovePage; 