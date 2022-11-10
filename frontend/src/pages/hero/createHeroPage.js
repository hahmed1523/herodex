import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const CreateHeroPage = () => {

    let navigate = useNavigate();

    const heroId = useParams().id;

    let [hero, setHero] = useState({
        // 'id': null,
        'name': '',
        'description': '',
        'famous_from_id':'',
        'famous_from': '',
        'move1_id':'',
        'move1': '',
        'move2_id':'',
        'move2': '',
        'user': 1
    });

    let [errors, setErrors] = useState([]);

    useEffect(() => {
        if(heroId){
            getHero();
        }
        
    }, [heroId]);


    const getHero = async () => {
        const response = await fetch(`/api/heroes/${heroId}`);
        const data = await response.json();
        data.move1 = data.move1_id;
        delete data['move1_id'];
        data.move2 = data.move2_id;
        delete data['move2_id'];
        data.famous_from = data.famous_from_id;
        delete data['famous_from_id'];

        setHero(data);
        
    };


    const update = field => {
        const name = field;
        return e => setHero({
            ...hero,
            [name]: e.target.value
        })
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        let response = null;
        if (heroId){
            response = await fetch(`/api/heroes/${heroId}/`,{
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(hero)
            });
        } else{
            response = await fetch('/api/heroes/',{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(hero)
            });
        }

        const data = await response.json();

        if(response.status !== 200){
            setErrors(data);

        } else {
            navigate('/');
        }
    };


    let [heroesFrom, setHeroesFrom] = useState([]);
    useEffect(() => {
        getHeroesFrom();
    }, [])

    const getHeroesFrom = async () => {
        const response = await fetch('/api/heroesfrom/');
        const data = await response.json();
        setHeroesFrom(data);
    }

    let [moves, setMoves] = useState([]);
    useEffect(() => {
        getMoves();
    }, [])
    const getMoves = async () => {
        const response = await fetch('/api/moves/');
        const data = await response.json();
        setMoves(data);
    }

    return (
        <div>
            {console.log(hero)}
            {errors ? <ul className='errors'>{Object.entries(errors).map((entry, idx) => {
                return(
                    <li key={idx}>{entry[0].charAt(0).toUpperCase() + entry[0].slice(1)}: {entry[1]}</li>
                )
            })}</ul> : null }

            <h2>Add a Hero</h2>

            <form className='hero-create'
                onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type='text' 
                    name='name' 
                    value={hero.name}
                    onChange={update('name')}/>

                <label htmlFor="description">Description:</label>
                <textarea name="description"
                    value={hero.description}
                    onChange={update('description')}></textarea>

                <label htmlFor="famous_from">Famous From:</label> 
                <select name="famous_from" 
                    value={hero.famous_from}
                    onChange={update('famous_from')}>
                        <option>Select</option>
                        {heroesFrom?.map(heroFrom => (
                            <option key={heroFrom.id} value={heroFrom.id}>{heroFrom.name}</option>
                        ))}
                </select>
                
                <Link className="herofrom-link" to={'/heroesfrom/create'}>Add a new hero source..</Link>
                
                <label htmlFor="move1">Primary Move:</label>
                <select 
                    name="move1" 
                    value={hero.move1}
                    onChange={update('move1')}>
                        <option>Select</option>
                        {moves?.map(move => (
                            <option key={move.id} value={move.id}>{move.name}</option>
                        ))}
                </select>

                <label htmlFor="move2">Secondary Move:</label>
                <select 
                    name="move2" 
                    value={hero.move2}
                    onChange={update('move2')}>
                        <option>Select</option>
                        {moves?.map(move => (
                            <option key={move.id} 
                                    value={move.id}
                                    >{move.name}</option>
                        ))}
                </select>

                <input type='submit' value={heroId ? "Update" : "Add"}/>

            </form>

        </div>
    );
};

export default CreateHeroPage;