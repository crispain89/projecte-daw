import React, { useState,useEffect } from 'react'
import { Button, ButtonGroup, ButtonToolbar, Collapse } from 'react-bootstrap'
import EventosService from '../../servicios/eventos.service';
import Filters from './Filters';
import Evento from './TarjetaEvento';

//En esta pagina se mostraran todos los eventos de la aplicacion, por orden alfabetico o proximidad,
//por defecto, la lista mostrará primero los eventos a los que estas inscrito y los diferenciará de los otros
//con una etiqueta verde de "inscrito" 
//Además, se podrá filtrar por inscritos o no inscritos, para que la busqueda sea mas sencilla

export default function Eventos({className, ...rest}) {
  const [open, setOpen] = useState(false);
  const [eventos, setEventos] = useState([]);
  const [filteredEventos, setFilteredEventos] = useState([])

  useEffect(()=>{
    console.log("eventos",filteredEventos)
  },[filteredEventos,eventos])

  useEffect(() => {
    if(eventos.length > 0) return
    async function getEventos (){
      try{
        const eventos= await EventosService.index("eventos");
        console.log(eventos.data)
        setEventos(eventos.data)
        setFilteredEventos(eventos.data)

      }catch(err){
        console.log(err)
      }
    }
    getEventos();
    return () =>getEventos();
  },[])

  return (
    <div>
      <Filters setEventos={setFilteredEventos} filteredEventos={filteredEventos} eventos={eventos} open={open} setOpen={setOpen}/>
      <div className='eventos__topbar'>
        <div className='eventos'>
          { 
            filteredEventos.length > 0 
            ?
              <>
                <h1>Eventos Disponibles</h1>
                {filteredEventos.map((evento)=>{ 
                  return <Evento key={evento.id} nombre={evento.nombre} edicion={evento.edicion} lugar={evento.lugar} src={evento.src}/>
                })}
              </>
            :
              <h1>No hemos encontrado ningun resultado</h1>
          }
        </div>
      </div>
    </div>
  )
}
