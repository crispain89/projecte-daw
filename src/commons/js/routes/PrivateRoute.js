import React, { useContext, useEffect,useState } from 'react'
import {  Route, useLocation, useNavigate,Navigate } from 'react-router';
import { useAuth } from '../AuthContext';

export default function PrivateRoute(props) {
    // keep in mind path is required as a prop
    const [logged,setLogged]=useState(false);
    const { isAuthenticated,isLogged } = useAuth();
    const location = useLocation()
    const { path, children, ...rest } = props;
    let navigate = useNavigate()

    if(!isAuthenticated){
       return <Navigate to='/login' replace state={{from: location}}/>
    } 
    // using the AuthContext to get the state variable isAuthenticated
 
    return children;
}