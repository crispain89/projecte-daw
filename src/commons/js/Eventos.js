import React, { useState,useEffect } from 'react'
import { Button, ButtonGroup, ButtonToolbar, Collapse } from 'react-bootstrap'
import ApiCrudService from '../../servicios/eventos.service';
import Evento from './TarjetaEvento.js';

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
      <div className='filters__wrapper'>
        <Button
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
        >
          Filtros
        </Button>
        <Collapse in={open}>
          <div id="example-collapse-text">
            <span>Escoge un filtro: </span>
          <ButtonToolbar type="checkbox" >
            <ButtonGroup >
              <Button onClick={(e)=>{setSelected(1)}} className={`${selected === 1 ? "selected" : ""} button__option`} value={1}>Inscritos</Button>
              <Button onClick={(e)=>{setSelected(2)}} className={`${selected === 2 ? "selected" : ""} button__option`} value={2}>No inscritos</Button>
              <Button onClick={(e)=>{setSelected(3)}} className={`${selected === 3 ? "selected" : ""} button__option`} value={3}>Todos</Button>
            </ButtonGroup>
          </ButtonToolbar>
          </div>
        </Collapse>
      </div>
      <div className='eventos__topbar'>
        <h1>Eventos Disponibles</h1>

        <div className='eventos'>
          { eventos.map((evento)=>{ 
          return<Evento key={evento.id} nombre={evento.nombre} edicion={evento.edicion} lugar={evento.lugar} src={evento.src}/>
          })}
        </div>
      </div>
    </div>
  )
}
