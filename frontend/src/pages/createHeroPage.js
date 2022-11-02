import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CreateHeroPage = () => {

    const heroId = useParams().id;

    let [hero, setHero] = useState({
        'id': null,
        'name': '',
        'description': '',
        'famous_from': '',
        'famous_from_id': null,
        'move1': '',
        'move2': '',
        'move1_id': null,
        'move2_id': null,
        'user': 1
    });

    useEffect(() => {
        if(heroId){
            getHero();
        }
        
    }, [heroId]);


    const getHero = async () => {
        const response = await fetch(`/api/heroes/${heroId}`);
        const data = await response.json();
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
                    defaultValue={hero.famous_from_id}
                    onChange={update('famous_from_id')}>
                        <option disabled>Select</option>
                        {heroesFrom?.map(heroFrom => (
                            <option key={heroFrom.id} value={heroFrom.id}>{heroFrom.name}</option>
                        ))}
                </select>
                
                <label htmlFor="move1">Primary Move:</label>
                <select 
                    name="move1" 
                    defaultValue={hero.move1_id}
                    onChange={update('move1_id')}>
                        <option disabled>Select</option>
                        {moves?.map(move => (
                            <option key={move.id} value={move.id}>{move.name}</option>
                        ))}
                </select>

                <label htmlFor="move2">Secondary Move:</label>
                <select 
                    name="move2" 
                    defaultValue={hero.move2_id}
                    onChange={update('move2_id')}>
                        <option disabled>Select</option>
                        {moves?.map(move => (
                            <option key={move.id} value={move.id}>{move.name}</option>
                        ))}
                </select>

                <input type='submit' value={heroId ? "Update" : "Add"}/>

            </form>

        </div>
    );
};

export default CreateHeroPage;