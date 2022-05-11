import React, { useState,useEffect } from 'react'
import { Button, ButtonGroup, ButtonToolbar, Collapse } from 'react-bootstrap'
import ApiCrudService from '../../servicios/eventos.service';
import Filters from './Filters';
import Evento from './TarjetaEvento';

//En esta pagina se mostraran todos los eventos de la aplicacion, por orden alfabetico o proximidad,
//por defecto, la lista mostrará primero los eventos a los que estas inscrito y los diferenciará de los otros
//con una etiqueta verde de "inscrito" 
//Además, se podrá filtrar por inscritos o no inscritos, para que la busqueda sea mas sencilla

export default function Eventos({className, ...rest}) {
  const [open, setOpen] = useState(false);
  const [selected,setSelected] = useState(0)
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    if(eventos.length > 0) return
    async function getEventos (){
      try{
        const eventos= await ApiCrudService.index("eventos");
        console.log(eventos.data)
        setEventos(eventos.data)
        

      }catch(err){
        console.log(err)
      }
    }
    getEventos();
    return () =>getEventos();
  },[])
  return (
    <div>
      <Filters eventos={eventos} open={open} setOpen={setOpen}/>
      <div className='eventos__topbar'>
        <h1>Eventos Disponibles</h1>

        <div className='eventos'>
          { eventos.map((evento)=>{ 
          return <Evento key={evento.id} nombre={evento.nombre} edicion={evento.edicion} lugar={evento.lugar} src={evento.src}/>
          })}
        </div>
      </div>
    </div>
  )
}
