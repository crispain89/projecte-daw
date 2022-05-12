import React,{useState, useContext} from 'react'

//import '../css/estilosGrid.css'
import * as yup from "yup"
import {Form, Button, Row, Col, InputGroup} from 'react-bootstrap'
import { Formik } from 'formik';
import YupPassword from 'yup-password'
import AuthService from '../../servicios/auth.service'
import { useNavigate } from 'react-router-dom';
YupPassword(yup)


/* no son integers son NUMBER */
const schema = yup.object().shape({
  nombre: yup.string(20).required(),
  apellidos: yup.string(50).required(),
  email: yup.string().email().max(255).required(),
  password: yup.string().password().required('Tienes que poner una contraseña'),

/* Que conincida la doble contraseña */
  rep_password: yup.string().password().oneOf([yup.ref('password'),null],'Las contaseñas tiene que coincidir.'),
  dni:yup.string().matches(/^(\d{8})([-]?)()[A-Z]{1}$/),
  pablacion: yup.string(15),
  provincia: yup.string(15),
  codigo_postal: yup.string(5),
  telefono: yup.number(9),
  file: yup.mixed(),
  terms: yup.bool().required().oneOf([true], 'tienes que aceptar los términos'),
});
export function Register() {
  let navigate=useNavigate();
  const HandleRedirect=()=>{
    /* cuando lo usamos le decimos donde nos queremos dirigir */
    navigate("/login", {replace: true});

  }
  /* const [newForm, setNewForm] = useState(
    {nombre: '', lastName:'', email:'',passwordP:'', passwordConfirmation:'',dni:'',city:'',state:'',phone:'',file:null, terms:false}) */


  return (
  <div className='container'>
    <div class="row justify-content-center">
      <h3 className="componente__titulo" >Register</h3>
      <Formik
        validationSchema={schema}
        initialValues={{

          nombre: '',
          apellidos: '',
          email:'',
          password: '',
          rep_password:'',
          dni:'',
          poblacion: '',
          provincia: '',
          codigo_postal:'',
          telefono:'',
          fecha_nacimiento:'',
          file: null,
          terms: false,
        }}
        onSubmit={async (values)=>{
          console.log(values)
          let registro=null;
          try{
            registro= await AuthService.signup(values)
          }catch(e){
            console.log(e)
          }
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
                  name="nombre"
                  value={values.nombre}
                  onChange={handleChange}
                  isValid={touched.nombre && !errors.nombre}
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
                  name="apellidos"
                  value={values.apellidos}
                  onChange={handleChange}
                  isValid={touched.apellidos && !errors.apellidos}
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
              {/* FECHA NACIMIENTO */}
              <Form.Group
                as={Col}
                controlId="validationFormik103"  
              >
                <Form.Label>Fecha nacimiento</Form.Label>
                <Form.Control
                  type="date"
                  name="fecha_nacimiento"
                  value={values.fecha_nacimiento}
                  onChange={handleChange}
                  isInvalid={!!errors.fecha_nacimiento}
                />

                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.fecha_nacimiento}
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
                  name="poblacion"
                  value={values.poblacion}
                  onChange={handleChange}
                  isInvalid={!!errors.poblacion}
                />

                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.poblacion}
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
                  name="telefono"
                  value={values.telefono}
                  onChange={handleChange}
                  isInvalid={!!errors.telefono}
                />

                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.telefono}
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
                  name="provincia"
                  value={values.provincia}
                  onChange={handleChange}
                  isInvalid={!!errors.provincia}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.provincia}
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
                  name="codigo_postal"
                  value={values.codigo_postal}
                  onChange={handleChange}
                  isInvalid={!!errors.codigo_postal}
                />

                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.codigo_postal}
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
            <Button className="botones__login" variant="primary" type="submit">Registrate</Button>
            <Button className="botones__login" variant="secondary" onClick={()=>HandleRedirect()} >Login</Button>
            
          </Form>
        )}
      </Formik>
    </div>
  </div>
  );
}
