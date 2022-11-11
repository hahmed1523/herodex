import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CreateMovePage = () => {
    const navigate = useNavigate();

    const moveId = useParams().id;

    let [move, setMove] = useState({
        'id': null,
        'name': '',
        'user': 1
    });

    let [errors, setErrors] = useState([]);

    useEffect(() => {
        if(moveId){
            getMove();
        }
        
    }, [moveId]);


    const getMove= async () => {
        const response = await fetch(`/api/moves/${moveId}`);
        const data = await response.json();
        setMove(data);
    };

    const update = field => {
        const name = field;

        return e =>
                setMove({
                    ...move,
                    [name]: e.target.value
                })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let response = null;
        if (moveId){
            response = await fetch(`/api/moves/${moveId}/`,{
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(move)
            });
        } else{
            response = await fetch('/api/moves/',{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(move)
            });
        }

        const data = await response.json();

        if(response.status !== 200){
            setErrors(data);

        } else {
            navigate(-1);
        }

    };

    return (
        <div>
            {errors ? <ul className='errors'>{Object.entries(errors).map((entry, idx) => {
                return(
                    <li key={idx}>{entry[0].charAt(0).toUpperCase() + entry[0].slice(1)}: {entry[1]}</li>
                )
            })}</ul> : null }

            <h1>Add New Move</h1>

            <form className='herofrom-create'
                    onSubmit={handleSubmit}>

                <label htmlFor="name">Name:</label>
                <input type='text' 
                    name='name' 
                    value={move.name}
                    onChange={update('name')}/>
                
                <input type='submit' value={moveId ? "Update" : "Add"}/>
            </form>
        </div>
    );
};

export default CreateMovePage;