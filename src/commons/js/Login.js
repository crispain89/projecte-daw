import React from 'react'
import {Form, Button} from 'react-bootstrap'



export function Login(props) {
  return (
    <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Dirección de email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
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
        <Button variant="primary" type="submit">
            Login
        </Button>
    </Form>
  )
}



