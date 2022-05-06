import React, { useContext, useEffect } from 'react'
import {  Route, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../AuthContext';

export default function PrivateRoute(props) {
    // keep in mind path is required as a prop
    const { isAuthenticated } = useContext(AuthContext);
    const location = useLocation()
    const { path, children, ...rest } = props;
    let navigate = useNavigate()
    useEffect(()=>{
        if ( !isAuthenticated ){
            navigate("/login",{state:{...location.state}})
        }
    })
    // using the AuthContext to get the state variable isAuthenticated


    return children;
}