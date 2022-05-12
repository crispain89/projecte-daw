import React, {useContext, useEffect} from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from './context/AuthContext';

const MockComponent = () =>{
    let navigate = useNavigate()

    const { isAuthenticated } = useAuth();
    //Es mock, era para probar si hacia algo aun no lifa tenemos SIIIIIII
    if(!isAuthenticated){
        navigate('/login');
    }
    return <h1>Hola mundo</h1>
}

export default MockComponent;