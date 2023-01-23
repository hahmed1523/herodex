import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HeroItem = ({hero, user,authTokens, getHeroes}) => {

    const navigate = useNavigate();

    const handleLike = async () => {
        let response = null;
        if (!authTokens){
            navigate('/login')
            return
        } else if (hero.current_user_liked){
            response = await fetch('/api/hero_likes/',{
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access)
                 },
                 body: JSON.stringify({
                    'hero': hero.id,
                    'user': user.user_id
                 })
            });
            getHeroes();
        } else {
            response = await fetch('/api/hero_likes/',{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access)
                 },
                 body: JSON.stringify({
                    'hero': hero.id,
                    'user': user.user_id
                 })
            });
            getHeroes();
        }

        const data = await response.json();
        
        
    };

    return (
        <li>
            <Link to={`/hero/${hero.id}`}>
                <p>{ hero.name }</p>
            </Link>
            <p>{ hero.famous_from }</p>
            <section className='like_section'>
                <button className="fa fa-thumbs-up like_buttton"
                        onClick={handleLike}></button>
                <p>Likes: { hero.likes }</p>
            </section>
            
        </li>
    );
};

export default HeroItem;