import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function PrivateRoute({children}){
    const {GetUser} = useContext(AuthContext);
    const Navigate = useNavigate();
    useEffect(()=>{
        if(!GetUser()) Navigate('/login')
    },[GetUser, Navigate])
    return <>{children}</>
}

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PrivateRoute;