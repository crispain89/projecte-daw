import React,{useState, useEffect} from 'react'
import {Form, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import MenusAuxiliar from './MenusAuxiliar'
import EventosService from '../../servicios/eventos.service'


export default function ValidarPromo() {
const [evenUser, setEventUser]=useState([]);

useEffect(() => {
    function getEventosByUser(){
        let eventos = await EventosService.

    }
})


  return (
    <>
        <MenusAuxiliar >
            <Link className='btn btn-warning' to={'/comercio/modificaciones'} title={"Modicar comercio"} >Buscar Comercio</Link>
			<Link className='btn btn-warning' to={'/comercio'} title={"Dar de alta comercio"} >Alta comercio</Link>
        </MenusAuxiliar>
        <div className="container__dos-modificaciones">
            <Form >
                <h3> Introduce los datos para validar la promoción</h3>
                
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Introduce el numero DNI del cliente</Form.Label>
                    <Form.Control minLength='9' maxLength='9' type="text" required />
                    <Form.Select aria-label="Escoge un evento del usuario">


                    </Form.Select>
                    <Form.Label>Dni</Form.Label>
                    <Form.Control minLength='9' maxLength='9' type="text" required />
                    <Form.Label >Telefono</Form.Label>
                    <Form.Control minLength='9' maxLength='9' type="text"  />
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email'  />
                    <Form.Label >Fecha de Nacimiento</Form.Label>
                    <Form.Control type='date'/>
                </Form.Group>
            </Form>
        </div>
    </>
  )
}
