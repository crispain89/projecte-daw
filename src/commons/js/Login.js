import React , {useState, useEffect}from 'react'
import {Form, Button} from 'react-bootstrap'
import * as yup from "yup"
import {Formik} from 'formik'
import AuthService from '../../servicios/auth.service'

/* hacer la conexion a la API */
/* hacer useState para guardar los datos del usuario */
/* peticion post  localhost:8080/auth/login */
/* pasarle por post la informacion del usuario en JSON */

/* VALIDACION DEL LOGIN */

export function Login({setMostrar, ver}) {

/* Estado para el usuario */


const [form , setForm]= useState({ email:"", contraseña:""})

useEffect(()=>{
    console.log(form);
},[form])


const handleSubmit=(e)=>{
    e.preventDefault();
    AuthService.signin(form)
}

  return (
        <Form className="justify-content-center " onSubmit={handleSubmit}>
            <h3 className="componente__titulo" >Login</h3>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Dirección de email</Form.Label>
                    <Form.Control 
                    name='email'
                    size='sm' 
                    type="email" 
                    placeholder="introduce tu email" 
                    onChange={(e)=>setForm({...form, email:e.target.value})}/>
                    <Form.Text className="text-muted">
                    Estos datos no se van a compartir
                    </Form.Text>  
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contaseña</Form.Label>
                <Form.Control type="password" placeholder="contraseña" onChange={(e)=>setForm({...form, contraseña:e.target.value})}/>
                <Form.Text className="text-muted">
                Mínimo 8 caracteres, una letra Mayúscula y un número
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button className="botones__login" variant="primary" type="submit">
                Login
            </Button>
            <Button className="botones__login" onClick={()=>setMostrar(!ver)} variant="primary">
                Registrate
            </Button>
        </Form>      
  )
}



