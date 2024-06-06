import React, { useState } from "react";
import PropTypes from "prop-types";

export const GlobalStoreContext = React.createContext();

export const GlobalStoreProvider = ({ children }) => {


    const [theme, setTheme] = useState("light");
    const [categories, setCategories] = useState([]);
    const [languages, setLanguages] = useState([]);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    }

    const value = {
        theme,toggleTheme,
        categories,setCategories,
        languages,setLanguages
    };

    return <GlobalStoreContext.Provider value={value}>{children}</GlobalStoreContext.Provider>;
};

GlobalStoreProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

