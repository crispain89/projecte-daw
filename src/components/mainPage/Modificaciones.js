import React ,{useState,useContext, useEffect}from 'react'
import {Form, Button, Table} from 'react-bootstrap'
import { AuthContext } from '../context/AuthContext';
import ApiCrudService from '../../servicios/crud.service';
import UsuariosService from '../../servicios/usuarios.service'
import EventosService from '../../servicios/eventos.service'
import MenusAuxiliar from './MenusAuxiliar'
import {Link} from 'react-router-dom'






export default function Modificaciones({tabla}) {
    const { user, loading, setLoading } = useContext(AuthContext)
    const [usuario, setUsuario]= useState([])
    const [buscar, setBuscar]=useState(false)
    const [eventos, setEventos]=useState([])
    const [formState, setFormState]=useState("buscar")
/* buscar , editar(bloque de DNI), eliminar */
/* buscar :[buscar]  => Visualizamos los datos 2 opciones 1 EDITAR 2 BORRAR
    EDITAR => todos los campos se desbloquean menos el DNI que se bloquea y lo botones que aparecen son Guardar o Cancelar.
        GUARDAR => te guarda los cambios del usuario
        CANCELAR=> te deja los valores que tenia antes/
    BORRAR=> te borrar el usuario pero antes borrar las incripciones
        promp  de confirmacion cuando le des a borrar

    */

    const renderButtons = ()=>{
        switch (formState) {
            case "buscar":
                return <Button  variant="primary" type="submit">
                            Buscar
                        </Button>
            case "opciones":
                return <>
                        <Button variant="primary" type="submit">
                            Buscar
                        </Button>
                        <Button onClick={(e)=>setFormState('editar')} variant="warning" type="button">
                            Editar
                        </Button>
                        <Button onClick={(e)=>setFormState('eliminar')} variant="danger" type="button">
                            Eliminar
                        </Button>
                    </>
            case "editar":
                return <>
                        <Button variant="primary" type="submit">
                            Guardar
                        </Button>
                        <Button onClick={(e)=>setFormState('opciones')} variant="secondary" type="button">
                            Cancelar
                        </Button>
                    </>
            case "eliminar":
                let respuesta=window.confirm('Esta seguro de que quieres eliminar a este usuario? ')
                if (!respuesta) {
                    setFormState("opciones")
                }
                
            default:
                setFormState("opciones")
                break;
        }
    }    
    useEffect(() => {
        console.log(usuario)
         //const handleUsuario=async(e) => {
            /* try { 


            }catch(e) {}finally {
                /* setLoading(false) */
            //}


            


        //}
    },[usuario,eventos]) 
    const handleBlur=async(e)=>{
        console.log(e)
        e.preventDefault();
        /* setLoading(true); */

        try {
            let res =await UsuariosService.searchUser(e.target.value); 
            console.log(res.data)         
            setUsuario(res.data)
        }catch(error){
            console.log(error)
        }

    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        /* setLoading(true); */
        setBuscar(true);
        try {
            setLoading(true)
            if(formState ==='editar'){
                let res =await UsuariosService.update(usuario.id,usuario);
                console.log('RESSSSSSSSSSSSSSSSSSSSSss',res)
                return
            }
            let res =await UsuariosService.searchUser(usuario.dni);

            let ev=await EventosService.getEventosByUser(res.data.id);
            console.log(ev.data)
            setEventos(ev.data)
            setFormState('opciones')
            
        }catch(error){
            console.log(error)


        }finally{
            setLoading(false);
        };

    }
  return (
    <>
        <MenusAuxiliar >
				<Link className='btn btn-warning' to={'/inscripciones'} title={"Modicar usuario"} >Dar de alta usuario</Link>
		</MenusAuxiliar>
    <div className="container__dos-modificaciones">
        
        <Form  onSubmit={handleSubmit}>
            <h3>Introduce  los datos del usuario</h3>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nombre</Form.Label>
                <Form.Control value={usuario.nombre} onChange={(e)=>{setUsuario({...usuario,nombre:e.target.value})}} readOnly={formState!=='editar'}/>
                <Form.Label>Apellidos</Form.Label>
                <Form.Control value={usuario.apellidos} onChange={(e)=>{setUsuario({...usuario,apellidos:e.target.value})}} readOnly={formState!=='editar'}/>
                <Form.Label>Dni</Form.Label>
                <Form.Control  onBlur={handleBlur} type='text' maxLength="9" minLength="9"onChange={(e)=>{setUsuario({...usuario,dni:e.target.value.toUpperCase()})}} readOnly={formState==='editar'} />
                <Form.Label >Telefono</Form.Label>
                <Form.Control value={usuario.telefono}type='text' maxLength='9' onChange={(e)=>{setUsuario({...usuario,telefono:e.target.value})}} readOnly={formState!=='editar'}/>
                <Form.Label>Email</Form.Label>
                <Form.Control value={usuario.email} type='email' onChange={(e)=>{setUsuario({...usuario,email:e.target.value})}} readOnly={formState!=='editar'}/>
                <Form.Label >Fecha de Nacimiento</Form.Label>
                <Form.Control  value ={usuario.fecha_nacimiento} type='date' placeholder='AAAA/MM/DD' onChange={(e)=>{setUsuario({...usuario,fecha_nacimiento:e.target.value})}} readOnly={formState!=='editar'}/>
            </Form.Group>
            {
                renderButtons()
            }
            
            
            
        </Form>
    { buscar ?
        <div>
            <h3>Eventos del usuario</h3>
            <Table striped bordered hover size="sm">

                <thead>
                    <tr>
                        <th>nº</th>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Edicion</th>
                        <th>Fecha</th>
                        <th>Lugar</th>
                    </tr>
                </thead>
                <tbody>
                    { eventos.map((evento,e)=>{
                        return (
                         <tr key={evento.id}>
                            <td>{e+1}</td>
                            <td>{evento.id_evento}</td>
                            <td>{evento.nombre}</td>
                            <td>{evento.edicion}</td>
                            <td>{evento.fecha_inicio}</td>
                            <td>{evento.lugar}</td>
                         </tr>
                         )
                        
                    })
                    }
                    
                </tbody>
            </Table>
        </div>
        : null
    }


    </div>
    </>
    
    
    
    

  )
}
