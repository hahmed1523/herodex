import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CreateHeroFromPage = () => {

    const heroFromId = useParams().id;

    let [herofrom, setHeroFrom] = useState({
        'id': null,
        'name': '',
        'origin_date': '',
        'created_by': '',
        'user': 1
    });

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
        return e => setHeroFrom({
            ...herofrom,
            [name]: e.target.value
        })
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        let response = null;
        if (heroFromId){
            response = await fetch(`/api/heroesfrom/${heroFromId}/`,{
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(herofrom)
            });
        } else{
            response = await fetch('/api/heroesfrom/',{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(herofrom)
            });
        }

        const data = await response.json();
        console.log(data);

    };

    return (
        <div>
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
                    value={herofrom.origin_date}
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