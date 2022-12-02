import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/auth_context";

const PrivateRoutes = () => {
    let {user} = useContext(AuthContext);
    return(
        user ? <Outlet/> : <Navigate to="/login" />
    );
};

export default PrivateRoutes;