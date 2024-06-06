import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function AdminRoute({children}){
    const {GetUser} = useContext(AuthContext);
    const Navigate = useNavigate();
    useEffect(()=>{
        const user = GetUser();
        if(!user || user.role !== 'admin') Navigate('/login')
    },[Navigate, GetUser])

    return <>{children}</>
}

AdminRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AdminRoute;