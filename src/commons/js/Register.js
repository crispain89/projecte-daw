import React from 'react'
import Feedback from 'react-bootstrap/Feedback'
import * as yup from "yup"
import {Form, Button, Row, Col, InputGroup} from 'react-bootstrap'
import { Formik } from 'formik';


/* no son integers son NUMBER */
const schema = yup.object().shape({
  firstName: yup.string(20).required(),
  lastName: yup.string(50).required(),
  username: yup.string(12).required(),
  city: yup.string(15).required(),
  state: yup.string(15).required(),
 /*  zip: yup.number(5).required(), */
  phone: yup.number(9).required(),
  file: yup.mixed().required(),
  terms: yup.bool().required().oneOf([true], 'terms must be accepted'),
});
export function Register({setMostrar,ver}) {


  return (
    <div class="row justify-content-center">
      <h3 className="componente__titulo" >Register</h3>

      <Formik
        validationSchema={schema}
        onSubmit={console.log}
        initialValues={{
          firstName: 'Mark',
          lastName: 'Otto',
          username: '',
          city: '',
          state: '',
        /*   zip: '', */
          phone:'',
          file: null,
          terms: false,
        }}
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
            <Row>
              {/* NOMBRE */}
              <Form.Group
                as={Col}
                
                controlId="validationFormik101"
                
              >
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  isValid={touched.firstName && !errors.firstName}
                />
                <Form.Control.Feedback tooltip>Correcto</Form.Control.Feedback>
              </Form.Group>
              {/* APELLIDOS */}
            </Row>
            <Row >

              <Form.Group
                as={Col}
                controlId="validationFormik102"
              >
                <Form.Label>Apellidos</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  isValid={touched.lastName && !errors.lastName}
                />

                <Form.Control.Feedback tooltip>Correcto</Form.Control.Feedback>
              </Form.Group>
            </Row>
              {/* NOMBRE USUARIO */}
            <Row >
              <Form.Group as={Col} controlId="validationFormikUsername2">
                <Form.Label>Usuario</Form.Label>
                <InputGroup hasValidation>
    
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    aria-describedby="inputGroupPrepend"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    isInvalid={!!errors.username}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.username}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            
            
            <Row >
              {/* POBLACION */}
              <Form.Group
                as={Col}
      
                controlId="validationFormik103"
                
              >
                <Form.Label>Poblacion</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ciudad"
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  isInvalid={!!errors.city}
                />

                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.city}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
              {/* TELEFONO */}
            <Row >

              <Form.Group
                as={Col}
             
                controlId="validationFormik103"
                
              >
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="611111111"
                  name="phone"
                  value={values.city}
                  onChange={handleChange}
                  isInvalid={!!errors.phone}
                />

                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.phone}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
              {/* PROVINCIA */}
            <Row >
            
              <Form.Group
                as={Col}
               
                controlId="validationFormik104"
               
              >
                <Form.Label>Provincia</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Provincia"
                  name="state"
                  value={values.state}
                  onChange={handleChange}
                  isInvalid={!!errors.state}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.state}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
              {/* CODIGO POSTAL */}
            {/* <Row >
            
              <Form.Group
                as={Col}
                controlId="validationFormik105"
               >
                <Form.Label>Código postal</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Código Postal"
                  name="zip"
                  value={values.zip}
                  onChange={handleChange}
                  isInvalid={!!errors.zip}
                />

                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.zip}
                </Form.Control.Feedback>
              </Form.Group>
            </Row> */}
            {/* FOTO */}
            <Form.Group className="position-relative mb-1">
              <Form.Label>Archivo</Form.Label>
              <Form.Control
                type="file"
                required
                name="file"
                onChange={handleChange}
                isInvalid={!!errors.file}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.file}
              </Form.Control.Feedback>
            </Form.Group>
            {/* CHECK */}
            <Form.Group className="position-relative mb-3">
              <Form.Check
                required
                name="terms"
                label="Agree to terms and conditions"
                onChange={handleChange}
                isInvalid={!!errors.terms}
                feedback={errors.terms}
                feedbackType="invalid"
                id="validationFormik106"
                feedbackTooltip
              />
            </Form.Group>
            <Button className="botones__login" type="submit">Registrate</Button>
            <Button className="botones__login" onClick={()=>setMostrar(!ver)} >Login</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
