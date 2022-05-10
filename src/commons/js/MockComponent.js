import React, {useContext, useEffect} from 'react';
import { AuthContext,useAuth } from './AuthContext';
import { useNavigate } from 'react-router';

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