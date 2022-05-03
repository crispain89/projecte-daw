import React, {useState} from 'react'
import {Form, Button, Row, Col, InputGroup} from 'react-bootstrap'
import { useNavigate } from 'react-router';
import AuthService from '../../servicios/auth.service';
import '../css/estilosGrid.css'
import YupPassword from 'yup-password'
import * as yup from "yup"
import {Formik} from 'formik'


const schema = yup.object().shape({
    password: yup.string().password().required('Tienes que poner una contraseña'),

/* Que conincida la doble contraseña */
    rep_password: yup.string().password().oneOf([yup.ref('password'),null],'Las contaseñas tiene que coincidir.'),
})

export default function ForgotPassword() {
    const [form , setForm]= useState({ email:""})
    let navigate = useNavigate()
    const HandleSubmit= async(values)=>{
        console.log("values",values)
        try{
            console.log("cositas")
            let res = await AuthService.resetPassword(values)
            console.log(res)
            if(res.status===200){
                //Todo correcto pasamos al siguiente paso (esperar a la validacion del correo)
                console.log("ok", res.status)
                navigate("/forgot/email-verification", {state:{email:form.email}})
                
                /* pasarle al Context el usuario  */
            }
        }catch(e){
            if ( e.response.status === 400 ){
                console.log("CAGASTE")
                alert("CAGASTE, el email no existe")
            }
            console.log(e)
        }
    }

    return (
        <div className="container__login">
          <Formik
        validationSchema={schema}
        initialValues={{
          password: '',
          rep_password:'',
        }}
        onSubmit={HandleSubmit}
        >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isValid,
          errors,
        }) => (
          <Form noValidate onSubmit={handleSubmit} >
            {/* CONTRASEÑA */}
            <Row >
              <Form.Group as={Col} controlId="validationFormikPassword">
                <Form.Label>Contraseña</Form.Label>
                <InputGroup hasValidation>
    
                  <Form.Control
                    type="password"
                    placeholder="Contraseña"
                    aria-describedby="inputGroupPrepend"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                  />
                  <Form.Text className="text-muted">
                
                  </Form.Text>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.password}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>            
              {/* Repite CONTRASEÑA */}
              <Row >
              <Form.Group as={Col} controlId="validationFormikPassword2">
                <Form.Label>Repite la contraseña</Form.Label>
                <InputGroup hasValidation>
    
                  <Form.Control
                    type="password"
                    placeholder="Contraseña"
                    aria-describedby="inputGroupPrepend"
                    name="rep_password"
                    value={values.rep_password}
                    onChange={handleChange}
                    isInvalid={!!errors.rep_password}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.rep_password}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Button className="botones__login" type="submit">Guardar</Button>
            
          </Form>
        )}
      </Formik>
          </div>    
    )
}