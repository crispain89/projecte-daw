import React from 'react'
import {Form, Button} from 'react-bootstrap'



export function Login({setMostrar, ver}) {
  return (
    <Form className="justify-content-center ">
        <h3 className="componente__titulo" >Login</h3>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Dirección de email</Form.Label>
            <Form.Control size='sm' type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
            Estos datos no se van a compartir
            </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contaseña</Form.Label>
            <Form.Control type="password" placeholder="contraseña" />
            <Form.Text className="text-muted">
            Mínimo 8 caracteres
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



