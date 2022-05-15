import React, { CSSProperties, useState,useEfect } from 'react';
import Papa from 'papaparse';
import {Form, Button} from 'react-bootstrap'
import UsuariosService from '../../servicios/usuarios.service'

export default function CSVReader() {

const [inscripcion, setInscripcion]=useState([]);
const [datos, setDatos]=useState([]);
console.log("Vacio====??", inscripcion)


const handleSubmit = (e) => {
  e.preventDefault();
  console.log("holiiiiita", inscripcion)
  
  try{
    inscripcion.map(async (ins)=> {
    let res = await UsuariosService.create(ins)

    console.log(res)
    setDatos(res.data.id)
    /* return res; */

    })
    
    /* if(res.status ===200){console.log('hola')} */
    }catch(e){
      console.log(e)
    }
    
  }
  


const handleFile=(e)=>{
  const csv= e.target.files;
  if(csv){
      Papa.parse(csv[0],{
        header:true,
        complete: function(ins) {
          const inscripciones=ins.data
          setInscripcion(inscripciones)
        }
      })
    }
  };
  


return (

  <Form onSubmit={handleSubmit}>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Escoge un archivo</Form.Label>
      <Form.Control onChange={(e)=>handleFile(e)} type="file" accept=".csv,.xlsx,.xls" />
    </Form.Group>
    <Button variant="primary" type="submit">
      Enviar
    </Button>
</Form>
)
}


  
 

