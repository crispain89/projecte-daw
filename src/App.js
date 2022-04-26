import logo from './logo.svg';
import {Login} from './commons/js/Login'
import {Register} from './commons/js/Register'
import {Button} from 'react-bootstrap'
import React, { useState } from 'react';


import './App.css';

function App() {

const  [mostrar , setMostrar]=useState (false);


  return (
    <>
      
      {mostrar ? <Button variant='outline-primary' onClick={()=>setMostrar(false)} name='Login'>Login</Button> 
      : 
      <Button variant='outline-primary' onClick={()=>setMostrar(true)} name='Registrate'>Registrate</Button>}
      
      { mostrar ? <Register/> : <Login/>}
      
    </>
   
  )
}

export default App;
