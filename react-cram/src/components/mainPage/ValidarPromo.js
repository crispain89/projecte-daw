import React,{useState, useEffect} from 'react'
import {Form, Button, Table} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import MenusAuxiliar from './MenusAuxiliar'
import EventosService from '../../servicios/eventos.service'
import ComerciosService from '../../servicios/comercios.service'



export default function ValidarPromo() {
const [user, setUser]= useState([]);
const [promoUser, setPromoUser]=useState([]);
const [loading, setLoading]= useState(false);
const [encontrado, setEncontrado]= useState(false);

const handleSubmit=async(e) => {
    e.preventDefault();
    setLoading(true);
    try{
        let promos= await ComerciosService.searchPromoAndUser(user.dni, 52);
        console.log(promos.data)
        setPromoUser(promos.data)

    }catch(e){
        console.log(e)
        
    }finally{
        setLoading(false);
        setEncontrado(true);
    }

}
const handleValid=async(e,promo) => {
    e.preventDefault();
    console.log(e.target.value)
    //enviar el id_usuario y el
    // id_promo a la APi para hacer insercción a la tabla usuario-promocion
    try {


    }catch(e){

    }

}


  return (
    <>
        <MenusAuxiliar >
   
            <Link className='btn btn-warning' to={'/comercio/modificaciones'} title={"Modicar comercio"} >Buscar Comercio</Link>
			<Link className='btn btn-warning' to={'/comercio'} title={"Dar de alta comercio"} >Alta Comercio</Link>
             
            <Link className='btn btn-warning' to={'/comercio/validar'} title={"Modicar comercio"} >Validar Promoción</Link>
            
        </MenusAuxiliar>
        {!encontrado ?
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
                <Button type="submit" >Buscar promociones</Button>
            </Form>
        </div>
        :
        <div>
            <Table>
           <thead>
                <tr>
                    <th>nº</th>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Edicion</th>
                    <th>Titulo</th>
                    <th>Validar</th>
                </tr>
                </thead>
                <tbody>
                    { promoUser.map((promo,e)=>{
                        return (
                         <tr key={promo.id}>
                            <td>{e+1}</td>
                            <td>{promo.id_promocion}</td>
                            <td>{promo.nombre}</td>
                            <td>{promo.edicion}</td>
                            <td>{promo.titulo}</td>
                            <td><Button onClick={(e)=>handleValid(e,promo)}>Validar</Button></td>
                         </tr>
                         )
                        
                    })
                    }
                    
                </tbody>
           </Table>
        </div>
}
    </>
  )
}
