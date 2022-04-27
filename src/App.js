import './commons/css/estilos.css'
import logo from './logo.svg';
import {Login} from './commons/js/Login'
import {Register} from './commons/js/Register'
import {Button, Row, Col} from 'react-bootstrap'
import React, { useState } from 'react';


import './App.css';

function App() {

const  [mostrar , setMostrar] = useState (false);


  return (
    <>
      <h1 className="bienvenido">Bienvenidos a Cram</h1>
      { mostrar ?
      <div className="container">
       <Register setMostrar={setMostrar} ver={mostrar}/> 
       </div>
       :
      <div className="container__login">

        <Login setMostrar={setMostrar} ver={mostrar}/>
      </div>
      }
     {/*  {mostrar ? <Button variant='outline-primary' onClick={()=>setMostrar(false)} name='Login'>Login</Button> 
      : 
      <Button className='boton__auxiliar' variant='outline-primary' onClick={()=>setMostrar(true)} name='Registrate'>Registrate</Button>} */}
    <Footer> </Footer>
      
    </>
   
  )
}

export default App;
