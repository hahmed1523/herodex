import React, { useState, useEffect, useContext  } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/auth_context';

const CreateHeroFromPage = () => {

    let {user, authTokens, logoutUser} = useContext(AuthContext);

    const navigate = useNavigate();

    const heroFromId = useParams().id;

    let [herofrom, setHeroFrom] = useState({
        'id': null,
        'name': '',
        'origin_date': null,
        'created_by': '',
        'user': user ? user.id : null
    });

    let [errors, setErrors] = useState([]);

    useEffect(() => {
        if(heroFromId){
            getHeroFrom();
        }
        
    }, [heroFromId]);


    const getHeroFrom = async () => {
        const response = await fetch(`/api/heroesfrom/${heroFromId}`);
        const data = await response.json();
        setHeroFrom(data);
    };

    const update = field => {
        const name = field;

        return e => {
            if (name === 'origin_date' && e.target.value === ''){
                setHeroFrom({
                    ...herofrom,
                    [name]: null
                })
            } else {
                setHeroFrom({
                    ...herofrom,
                    [name]: e.target.value
                })
            }
            }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        let response = null;
        if (heroFromId){
            response = await fetch(`/api/heroesfrom/${heroFromId}/`,{
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access)
                },
                body: JSON.stringify(herofrom)
            });
        } else{
            response = await fetch('/api/heroesfrom/',{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access)
                },
                body: JSON.stringify(herofrom)
            });
        }

        const data = await response.json();

        if(response.status !== 200){
            setErrors(data);

        } else if(response.statusText === 'Unauthorized'){
            logoutUser();
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

            <h1>Add A New Hero Source</h1>

            <form className='herofrom-create'
                    onSubmit={handleSubmit}>

                <label htmlFor="name">Name:</label>
                <input type='text' 
                    name='name' 
                    value={herofrom.name}
                    onChange={update('name')}/>
                
                <label htmlFor="origin_date">Origin Date:</label>
                <input type='date' 
                    name='origin_date' 
                    value={herofrom.origin_date ? herofrom.origin_date : ''}
                    onChange={update('origin_date')}/>

                <label htmlFor="created_by">Created By:</label>
                <input type='text' 
                    name='created_by' 
                    value={herofrom.created_by}
                    onChange={update('created_by')}/>

                <input type='submit' value={heroFromId ? "Update" : "Add"}/>
            </form>
        </div>
    )
}

export default CreateHeroFromPage;