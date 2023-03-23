import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'



// function for PrivateRouteing 
export const PrivateRoute = ({ children }) => {
    const { token, setToken } = useContext(AuthContext);


    if (!token) {
        return <Navigate to={"/login"} />
    }
    
    return children;
}
 // <---  ---->