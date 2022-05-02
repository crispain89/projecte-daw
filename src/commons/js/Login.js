import React , {useState, useEffect, useContext}from 'react'
import '../css/estilosGrid.css'
import {Form, Button} from 'react-bootstrap'
import AuthService from '../../servicios/auth.service'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../UserContext'


/* hacer la conexion a la API */
/* hacer useState para guardar los datos del usuario */
/* peticion post  localhost:8080/auth/login */
/* pasarle por post la informacion del usuario en JSON */

/* VALIDACION DEL LOGIN */

export function Login() {
    let navigate = useNavigate();
    const {user, setUser}= useContext(UserContext)

    const HandleRedirect=()=>{
        navigate("/register",{replace:true})
    }

/* Estado para el usuario */


const [form , setForm]= useState({ email:"", password:""})

useEffect(()=>{
    console.log(user);
    if(user.id!==null){
        navigate("/register", {replace:true})
    }

},[])


const handleSubmit= async(e)=>{
    e.preventDefault();
    let login=null;
    try{
    login = await AuthService.signin(form)
    console.log(login)
    if(login.status===200){
        console.log("ok", login.status)
        const {email,id}=login.data
        setUser({email, id})
        navigate("/register", {replace:true})
        
        /* pasarle al Context el usuario  */
    }
    }catch(e){
        console.log(e)
    }
}

  return (
      <div className="container__login">
        <Form className="justify-content-center "  onSubmit={handleSubmit}>
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
                <Form.Control type="password" placeholder="password" onChange={(e)=>setForm({...form, password:e.target.value})}/>
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
            <Button className="botones__login" onClick={()=>HandleRedirect()} variant="primary">
                Registrate
            </Button>
            <a className='style__forgot'><span>¿Has olvidado la contraseña?</span></a>
        </Form>  
        </div>    
  )
}



