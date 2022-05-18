import React,{useState, useEffect,useContext} from 'react'
import {Form , Button, Image} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'
import ApiCrudService from '../../servicios/crud.service'
import EventosService from '../../servicios/eventos.service'
import MenusAuxiliar from './MenusAuxiliar'



export default function Eventos() {
    const { user, loading, setLoading } = useContext(AuthContext)
    const [evento, setEvento]=useState([]);
    const [datos, setDatos]=useState([]);
    const [listEventos, setListEventos]=useState([]);
/* 
    useEffect(() => {
        if(listEventos.length<0)return
        async function getEventos(){
            try{
                setLoading(true);
            }
        }
    }) */

    const handleSubmit =async(e)=>{
        e.preventDefault();
        try{


        }catch{

        }
    }

  return (
    <>
        <MenusAuxiliar >

            <Link className='btn btn-warning' to={'/eventos/modificaciones'} title={"Modicar Evento"} > Buscar Evento</Link>

        </MenusAuxiliar>
        <div>
            <h3>Dar de alta un evento</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Image src={evento.src }/>
                    <Form.Label>Nombre del Evento</Form.Label>
                    <Form.Control required onChange={(e)=>{setEvento({...evento,nombre:e.target.value})}}/>
                    <Form.Label>Edicion</Form.Label>
                    <Form.Control required onChange={(e)=>{setEvento({...evento,apellidos:e.target.value})}} />
                    <Form.Label>Lugar</Form.Label>
                    <Form.Control required type='text' maxLength="9" minLength="9"onChange={(e)=>{setEvento({...evento,lugar:e.target.value.toUpperCase()})}} />
                    <Form.Label >Fecha de Inicio</Form.Label>
                    <Form.Control required type='date' maxLength='9' onChange={(e)=>{setEvento({...evento,fecha_inicio:e.target.value})}} />
                    <Form.Label>Fecha de Finalización</Form.Label>
                    <Form.Control required type='date' onChange={(e)=>{setEvento({...evento,fecha_finalizacion:e.target.value})}} />
                    <Form.Label >Selecciona una foto para este evento</Form.Label>
                    <Form.Control   required type='file' placeholder='AAAA/MM/DD' onChange={(e)=>{setEvento({...evento,src:e.target.value})}} />
                </Form.Group>
                <Button variant='primary' type='submit'> Crear Evento</Button>

            </Form>
        </div>
    </>

  )
}
