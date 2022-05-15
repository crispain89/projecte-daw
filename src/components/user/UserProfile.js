import React, { useState, useEffect, useRef, useContext } from 'react'
import { Col, Form, Image, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import UsuariosService from '../../servicios/usuarios.service'
import { AuthContext } from '../context/AuthContext'

export default function UserProfile(){
    const {user,setUser} = useContext(AuthContext)
    const [selectedFile,setSelectedFile] = useState()

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0])
        console.log(e.target.files)
    }
    const handleFileUpload = async (e) => {
        e.preventDefault()
        if( !selectedFile ) {
            alert("Selecciona una imagen antes...")
            return
        }
        // Create an object of formData 
        const formData = new FormData()
        
        formData.append(
            "image",
            selectedFile,
            selectedFile.name
        )
        // Details of the uploaded file 
        console.log(selectedFile); 
        console.log("formData",formData); 
        
        // Request made to the backend api 
        // Send formData object 
        try{
            let res = await UsuariosService.updateAvatar(formData,user.id)
            if( res.status === 200 ){
                setUser({...user,avatar_src:res.data.avatar_src})
            }
        }
        catch(e){
            if (e.response.status === 500){
                console.log("ERROR",e)
            }
        }
    }

    return(
        <div className='d-flex justify-content-center align-items-center'>
            <Form className={"bg-light rounded p-4 w-75"}>
            <h1>Perfil de Usuario</h1>
                <fieldset className='customLegend'>
                    <legend>Avatar</legend>
                    <Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
                        <div className='avatar__form'>
                            <Image  src={user.avatar_src || 'https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/avat-01-512.png'} roundedCircle></Image>
                        </div>
                        <Form.Group controlId="formFile">
                            <Form.Label>Selecciona un nuevo avatar:</Form.Label>
                            <Form.Control onChange={handleFileChange} type="file" />
                        </Form.Group>
                        <button onClick={handleFileUpload} className='btn mt-2 btn-primary'>Cambiar avatar</button>
                    </Form.Group>
                </fieldset>
                <fieldset className='customLegend'>
                    <legend>Datos</legend>
                    <Col>
                        <Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="2">
                            Nombre
                            </Form.Label>
                            <Col sm="10">
                            <Form.Control readOnly defaultValue="contra" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="2">
                            Apellidos
                            </Form.Label>
                            <Col sm="10">
                            <Form.Control readOnly defaultValue="contra" />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group as={Col} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="2">
                            Email
                            </Form.Label>
                            <Col sm="10">
                            <Form.Control readOnly defaultValue="email@example.com" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="2">
                            Telefono
                            </Form.Label>
                            <Col sm="10">
                            <Form.Control readOnly defaultValue="contra" />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group as={Col} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="2">
                            Poblacion
                            </Form.Label>
                            <Col sm="10">
                            <Form.Control readOnly defaultValue="email@example.com" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="2">
                            DNI
                            </Form.Label>
                            <Col sm="10">
                            <Form.Control readOnly defaultValue="email@example.com" />
                            </Col>
                        </Form.Group>
                    </Col>
                </fieldset>
                <h5 className="bg-info profile__forgot rounded">
                    <span className='text-secondary'>Olvidaste la contraseña?</span>
                    <Link to="/forgot">Recuperar</Link>
                </h5>
            </Form>
        </div>   
    )
} 