import React, {useState} from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate, useLocation} from 'react-router';
import {  useParams } from 'react-router-dom';
import AuthService from '../../servicios/auth.service';
import '../css/estilosGrid.css'

export default function EmailVerification() {
    let form = useParams();
    let location = useLocation();
    console.log("form",form)
    console.log("location",location)
    const navigate = useNavigate()
    const handleResend = async (e) => {
        e.preventDefault()
        let data;
        if ( form.email ){
            data = form;
        }
        if (location?.state?.email){
            data=location.state
        }
        console.log("DATA",data)
        let res = await AuthService.forgotPassword(data)
    }   
    const handleRedirect = async (e) => {
        e.preventDefault()
        navigate("/login",{replace:true})
    } 

    return (
        <div className="container__login">
            <div className='d-flex flex-column gap-3'>
            <h1>Se ha enviado un email a tu cuenta para restablecer tu contraseña</h1>
            <Button onClick={handleResend}>
                Resend the link
            </Button>
            <span>Already verified?</span>
            <Button onClick={handleRedirect}>
                Return to login
            </Button>
            </div>
        </div>    
    )
}