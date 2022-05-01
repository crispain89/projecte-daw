import React from 'react'
import Feedback from 'react-bootstrap/Feedback'
import * as yup from "yup"
import {Form, Button, Row, Col, InputGroup} from 'react-bootstrap'
import { Formik } from 'formik';
import YupPassword from 'yup-password'
YupPassword(yup)


/* no son integers son NUMBER */
const schema = yup.object().shape({
  firstName: yup.string(20).required(),
  lastName: yup.string(50).required(),
  email: yup.string().email().max(255).required(),
  passwordP: yup.string().password().required('Tienes que poner una contraseña'),

/* Que conincida la doble contraseña */
  passwordConfirmation: yup.string().password().oneOf([yup.ref('passwordP'),null],'Las contaseñas tiene que coincidir.'),
  dni:yup.string().matches(/^(\d{8})([-]?)()[A-Z]{1}$/),
  city: yup.string(15),
  state: yup.string(15),
  cp: yup.string(5),
  phone: yup.number(9),
  file: yup.mixed(),
  terms: yup.bool().required().oneOf([true], 'tienes que aceptar los términos'),
});
export function Register({setMostrar,ver}) {


  return (
    <div class="row justify-content-center">
      <h3 className="componente__titulo" >Register</h3>
      <Formik
        validationSchema={schema}
        onSubmit={console.log}
        initialValues={{


          firstName: 'Otto',
          lastName: 'Barrous',
          username: '',
          email:'',
          passwordP: '',
          passwordConfirmation:'',
          dni:'',
          city: '',
          state: '',
          cp:'',
          phone:'',
          file: null,
          terms: false,
        }}>
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
              {/* EMAIL */}
            <Row >
              <Form.Group as={Col} controlId="validationFormikUsername2">
                <Form.Label required >email </Form.Label>
                <InputGroup hasValidation>
    
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    aria-describedby="inputGroupPrepend"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.email}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            {/* CONTRASEÑA */}
            <Row >
              <Form.Group as={Col} controlId="validationFormikPassword">
                <Form.Label>Contraseña</Form.Label>
                <InputGroup hasValidation>
    
                  <Form.Control
                    type="password"
                    placeholder="Contraseña"
                    aria-describedby="inputGroupPrepend"
                    name="passwordP"
                    value={values.passwordP}
                    onChange={handleChange}
                    isInvalid={!!errors.passwordP}
                  />
                  <Form.Text className="text-muted">
                
                  </Form.Text>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.passwordP}
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
                    name="passwordConfirmation"
                    value={values.passwordConfirmation}
                    onChange={handleChange}
                    isInvalid={!!errors.passwordConfirmation}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.passwordConfirmation}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row >
              {/* DNI */}
              <Form.Group
                as={Col}
                controlId="validationFormik103"  
              >
                <Form.Label>DNI</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="DNI"
                  name="dni"
                  value={values.dni}
                  onChange={handleChange}
                  isInvalid={!!errors.dni}
                />

                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.dni}
                </Form.Control.Feedback>
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
                  value={values.phone}
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
            <Row >
              <Form.Group
                as={Col}
                controlId="validationFormik105"
               >
                <Form.Label>Código postal</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Código Postal"
                  name="cp"
                  value={values.cp}
                  onChange={handleChange}
                  isInvalid={!!errors.cp}
                />

                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.cp}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
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
