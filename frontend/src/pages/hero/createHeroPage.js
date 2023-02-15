import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/auth_context';

const CreateHeroPage = () => {

    let {user, authTokens, logoutUser} = useContext(AuthContext);

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
        'image_url': '',
        'user': user ? user.user_id : null
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
        if (name === 'image_url'){
            return e => setHero({
                ...hero,
                [name]: e.target.files[0]
            })
        } else {
            return e => setHero({
                ...hero,
                [name]: e.target.value
            })
        }

    };

    const createFormData = data => {
        let form_data = new FormData();

        if (data.image_url){
            form_data.append("image_url", data.image_url, data.image_url.name)
        }
        form_data.append("name", data.name);
        form_data.append("description", data.description);
        form_data.append("famous_from_id", data.famous_from_id);
        form_data.append("famous_from", data.famous_from);
        form_data.append("move1_id", data.move1_id);
        form_data.append("move1", data.move1);
        form_data.append("move2_id", data.move2_id);
        form_data.append("move2", data.move2);
        form_data.append("user", data.user);

        return form_data;
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        let response = null;
        let f_data = createFormData(hero);
        f_data.forEach((value,key) => {
            console.log(value,key);
        })
        return;
        if (heroId){
            response = await fetch(`/api/heroes/${heroId}/`,{
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access)
                },
                body: JSON.stringify(hero)
            });
        } else{
            response = await fetch('/api/heroes/',{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access)
                },
                body: JSON.stringify(hero)
            });
        }

        const data = await response.json();

        if(response.status !== 200){
            setErrors(data);

        } else if(response.statusText === 'Unauthorized'){
            logoutUser();
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

                <Link className="moves-link" to={'/moves/create'}>Add a new move..</Link>

                <label htmlFor="name">Image:</label>
                <input type='file' 
                    name='image_url' 
                    onChange={update('image_url')}/>

                <input type='submit' value={heroId ? "Update" : "Add"}/>

            </form>


        </div>
    );
};

export default CreateHeroPage;