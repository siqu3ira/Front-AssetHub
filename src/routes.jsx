import React from "react";

import { Navigate, Route, redirect } from "react-router-dom";
import { isAuthenticated } from "./auth"

const validacaoUsuario = () => {
    return !!localStorage.getItem('authenticated')
    //return !!localStorage.getItem('access_token')
}

const PrivateRoute = ({ children }) => {
    if (!validacaoUsuario()) {
        return <Navigate to="/"/>
    }

    return children;
}

export default PrivateRoute;