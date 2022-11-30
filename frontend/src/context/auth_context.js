import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) => {

    let [authTokens, setAuthTokens] = useState(null);
    let [user, setUser] = useState(null);

    const loginUser = async (e) => {
        e.preventDefault();
        let response = fetch('/api/token/', {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({'username': e.target.username.value, 'password': e.target.password.value})
        });
    };

    const contextData = {
        loginUser:loginUser
    };

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};

