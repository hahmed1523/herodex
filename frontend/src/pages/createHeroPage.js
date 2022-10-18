import React, { useState, useEffect } from 'react';

const CreateHeroPage = () => {

    let [hero, setHero] = useState({});

    // const getFamousFrom = async () => {
    //     let response = await fetch()
    // }

    return (
        <div>
            <h2>Add a Hero</h2>

            <form className='hero-create'>
                <label for="name">Name:</label>
                <input type='text' name='name'/>

                <label for="description">Description:</label>
                <textarea name="description"></textarea>

                <label for="famous_from">Famous From:</label> 
                <select name="famous_from">
                    <option>Option1</option>
                </select>

                <label for="move1">Primary Move:</label>
                <select name="move1">
                    <option>Option1</option>
                </select>

                <label for="move2">Primary Move:</label>
                <select name="move2">
                    <option>Option1</option>
                </select>

                <input type='submit' value='Add'/>
            </form>
        </div>
    );
};

export default CreateHeroPage;