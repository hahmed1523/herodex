import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MoveItem from '../../components/moveItem';

const MovesIndexPage = () => {

    let [moves, setMoves] = useState([]);

    useEffect(() => {
        getMoves();
    }, []);

    const getMoves = async () => {
        const response = await fetch('/api/moves/');
        const data = await response.json();
        setMoves(data);
    };
    return (
        <div>
            <h2>Moves List</h2>

            <Link to='/moves/create'>Add Move</ Link>

            <ul className='moves-list'>
                {
                    moves?.map((move, index) => (
                        <MoveItem key={index} move={move} />
                    ))
                }
            </ul>
        </div>
    )
}

export default MovesIndexPage;