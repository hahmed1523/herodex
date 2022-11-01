import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CreateHeroPage = () => {

    const heroId = useParams().id;

    let [hero, setHero] = useState({
        'id': null,
        'name': '',
        'description': '',
        'famous_from': null,
        'move1': null,
        'move2': null,
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
        const response = await fetch('/api/heroes/',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(hero)
        });
        const data = await response.json();
        console.log(data);
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
                    defaultValue={"Select"}
                    onChange={update('famous_from')}>
                        <option disabled>Select</option>
                        {heroesFrom?.map(heroFrom => (
                            <option key={heroFrom.id} value={heroFrom.id}>{heroFrom.name}</option>
                        ))}
                </select>
                
                <label htmlFor="move1">Primary Move:</label>
                <select 
                    name="move1" 
                    defaultValue={"Select"}
                    onChange={update('move1')}>
                        <option disabled>Select</option>
                        {moves?.map(move => (
                            <option key={move.id} value={move.id}>{move.name}</option>
                        ))}
                </select>

                <label htmlFor="move2">Secondary Move:</label>
                <select 
                    name="move2" 
                    defaultValue={"Select"}
                    onChange={update('move2')}>
                        <option disabled>Select</option>
                        {moves?.map(move => (
                            <option key={move.id} value={move.id}>{move.name}</option>
                        ))}
                </select>

                <input type='submit' value='Add'/>
                {console.log(hero)}
            </form>

        </div>
    );
};

export default CreateHeroPage;