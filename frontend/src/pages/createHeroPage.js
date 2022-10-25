import React, { useState, useEffect } from 'react';

const CreateHeroPage = () => {

    let [hero, setHero] = useState({});


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

            <form className='hero-create'>
                <label htmlFor="name">Name:</label>
                <input type='text' name='name'/>

                <label htmlFor="description">Description:</label>
                <textarea name="description"></textarea>

                <label htmlFor="famous_from">Famous From:</label> 
                <select name="famous_from" defaultValue={"Select"}>
                    <option disabled>Select</option>
                    {heroesFrom?.map(heroFrom => (
                        <option key={heroFrom.id} value={heroFrom.id}>{heroFrom.name}</option>
                    ))}
                </select>
                
                <label htmlFor="move1">Primary Move:</label>
                <select name="move1" defaultValue={"Select"}>
                    <option disabled>Select</option>
                    {moves?.map(move => (
                        <option key={move.id} value={move.id}>{move.name}</option>
                    ))}
                </select>

                <label htmlFor="move2">Secondary Move:</label>
                <select name="move2" defaultValue={"Select"}>
                    <option disabled>Select</option>
                    {moves?.map(move => (
                        <option key={move.id} value={move.id}>{move.name}</option>
                    ))}
                </select>

                <input type='submit' value='Add'/>
            </form>

        </div>
    );
};

export default CreateHeroPage;