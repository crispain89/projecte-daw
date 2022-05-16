import React, { CSSProperties, useState,useEffect, useContext} from 'react';
import { AuthContext } from '../context/AuthContext';
import Papa from 'papaparse';
import {Form, Button} from 'react-bootstrap'
import ApiCrudService from '../../servicios/crud.service'
import EventosService from '../../servicios/eventos.service'
export default function CSVReader() {
	
const {user, loading, setLoading} = useContext(AuthContext)
const [inscripcion, setInscripcion]=useState([]);
const [datos, setDatos]=useState([]);
const [eventos, setEventos]=useState([]);
const [idEvento, setIdEvento]=useState();

useEffect(() => {
	console.log("DATOS",datos)
})
useEffect(() => {
  if(eventos.length<0) return 
    async function getEventos(){
      try{
		setLoading(true)
        const eventos = await EventosService.getEventosCurrent("eventos")
        console.log("eventos para el select:=>",eventos.data)
        setEventos(eventos.data)
        console.log("22222222222222222222222222",eventos)
       
      }catch(e){
        console.log(e)
      }finally{
		  setLoading(false)
	  }
    }
	getEventos();
  },[])


const handleSubmit = async(e) => {
  e.preventDefault();  
  try{
	
		let newIns=await Promise.all(inscripcion.map(async (ins)=> {
    		return await ApiCrudService.create("usuarios",ins)
    
		}))
		setDatos(newIns)
		

		await Promise.all(newIns.map(async(part)=>{
			console.log("PARTTTT",part)
			return await ApiCrudService.create("inscripciones",{id_usuario:part.data.id,id_evento:idEvento})

		}))
    let coun=eventos.length
    console.log("EVENTOS",eventos)
    alert("Se han inscrito los usuarios correctamente en la carrera .")
    
    }catch(e){
      console.log(e)
    }
}
  
const handleSelect=(e)=>{
	let idEvento=e.target.value
	setIdEvento(idEvento)
	console.log(idEvento)
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
  <>
    
    <Form.Label>Escoge un evento para inscribir a los participantes</Form.Label>
    <Form.Select aria-label="Escoge un evento" onChange={(e)=>handleSelect(e)}>
		{
		eventos.map((evento)=>{
			return <option value={evento.id}> {evento.nombre + " "+ evento.edicion}</option>
			}) 
		}
    </Form.Select>

    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Escoge un archivo</Form.Label>
        <Form.Control onChange={(e)=>handleFile(e)} type="file" accept=".csv,.xlsx,.xls" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Enviar
      </Button>
    </Form>

    
  </>
)
}


  
 

