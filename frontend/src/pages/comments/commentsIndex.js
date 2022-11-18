import React, {useState, useEffect} from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Comment from '../../components/comments';
import CreateCommentsPage from '../comments/createComments';

const CommentIndexPage = ({heroId}) => {

    let [comments, setComments] = useState([]);

    useEffect(() => {
        getComments();
    }, []);

    const getComments = async () => {
        const response = await fetch(`/api/heroes/${heroId}/comments`);
        const data = await response.json();
        setComments(data);
    }

    return(
        <div className='comments-section'>

            <CreateCommentsPage heroId={heroId} setComments={setComments} comments={comments}/>

            <h3>Comments</h3>
            {comments?.map((comment, idx)=>{
                return(
                    <Comment key={idx} comment={comment} setComments={setComments} />
                )
            })}

            
        </div>
    )
};

export default CommentIndexPage;