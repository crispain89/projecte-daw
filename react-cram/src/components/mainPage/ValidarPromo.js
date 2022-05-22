import React,{useState, useEffect} from 'react'
import {Form, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import MenusAuxiliar from './MenusAuxiliar'
import EventosService from '../../servicios/eventos.service'
import ComerciosService from '../../servicios/comercios.service'



export default function ValidarPromo() {
const [user, setUser]= useState([]);
const [promoUser, setPromoUser]=useState([]);
const [loading, setLoading]= useState(false);

const handleSubmit=async(e) => {
    e.preventDefault();
    setLoading(true);
    try{
        let promos= await ComerciosService.searchPromoAndUser(user.dni, 52);
        console.log(promos)

    }catch(e){
        console.log(e)
        
    }finally{
        setLoading(false);
    }

}

  return (
    <>
        <MenusAuxiliar >
            <Link className='btn btn-warning' to={'/comercio/modificaciones'} title={"Modicar comercio"} >Buscar Comercio</Link>
			<Link className='btn btn-warning' to={'/comercio'} title={"Dar de alta comercio"} >Alta comercio</Link>
        </MenusAuxiliar>
        <div className="container__dos-modificaciones">
            <Form onSubmit={handleSubmit} >
                <h3> Introduce los datos para validar la promoción</h3>
                
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Introduce el numero DNI del cliente</Form.Label>
                    <Form.Control onChange={(e)=> setUser({...user, dni:e.target.value})} placeholder="000000000R" minLength='9' maxLength='9' type="text" required />
                    <Form.Label >Telefono</Form.Label>
                    <Form.Control minLength='9' maxLength='9' type="text" onChange={(e)=> setUser({...user, telefono:e.target.value})} />
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' onChange={(e)=> setUser({...user, email:e.target.value})} />
                </Form.Group>
                <Button type="submit" >Validar Promocion</Button>
            </Form>
        </div>
    </>
  )
}
