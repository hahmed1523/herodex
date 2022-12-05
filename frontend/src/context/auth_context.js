import { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) => {

    let navigate = useNavigate();

    let [authTokens, setAuthTokens] = useState( () =>
        localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
    );
    let [user, setUser] = useState( () =>
        localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')).access : null);

    let [loading, setLoading] = useState(true);

    useEffect(() => {

        const fourMinutes = 1000 * 60 * 4;
        let interval = setInterval(() => {
            if (authTokens){
                updateToken();
            }
        }, fourMinutes);
        return () => clearInterval(interval);

    }, [authTokens, loading]);

    const loginUser = async (e) => {
        e.preventDefault();
        let response = await fetch('/api/token/', {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({'username': e.target.username.value, 'password': e.target.password.value})
        });

        const data = await response.json();

        if(response.status === 200){
            setAuthTokens(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data));
            navigate('/');
        } else {
            //
        }
    };

    const updateToken = async () => {
        const response = await fetch('/api/token/refresh/',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({'refresh': authTokens?.refresh})
        });

        const data = await response.json();

        if (response.status === 200){
            setAuthTokens(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data));
        } else {
            logoutUser();
        }

        if(loading){
            setLoading(false);
        }

        
    }

    useEffect(() => {
        if(user && loading){
            updateToken();
        } else {
            setLoading(false);
        };
    });

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        navigate('/login');
    }

    const contextData = {
        loginUser:loginUser,
        logoutUser:logoutUser,
        user:user,
        authTokens:authTokens
    };

    return(
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};

