import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { logOutUser } from "../api";
export const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user,setUser] = useState();

    useEffect(()=>{
        LogInUser();
    },[])

    function LogInUser(){
        const User = Cookies.get("user");
        if(User){
            setUser(JSON.parse(User)); 
            setIsLoggedIn(true);
        }  
    }

    function LogOutUser(){
        logOutUser()
        .then(() => {
            localStorage.clear();
            setUser(null);
            setIsLoggedIn(false);
        })
        .catch(error => {
            console.error("Error logging out:", error);
        }); 
    }

    function GetUser(){
        const User = Cookies.get("user");
        if(User) return JSON.parse(User)
    }
  

    const value = {
        user,isLoggedIn,LogInUser,LogOutUser,
        GetUser
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};