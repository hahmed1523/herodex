import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/auth_context";

const RegisterRoutes = () => {
    let {user} = useContext(AuthContext);
    return(
        user ? <Navigate to="/" /> : <Outlet/> 
    );
};

export default RegisterRoutes;