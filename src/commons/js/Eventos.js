import React, { useState } from 'react'
import { Button, Collapse, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'

//En esta pagina se mostraran todos los eventos de la aplicacion, por orden alfabetico o proximidad,
//por defecto, la lista mostrará primero los eventos a los que estas inscrito y los diferenciará de los otros
//con una etiqueta verde de "inscrito" 
//Además, se podrá filtrar por inscritos o no inscritos, para que la busqueda sea mas sencilla

export default function Eventos({className, ...rest}) {
  const [open, setOpen] = useState(false);
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
          <ToggleButtonGroup type="checkbox" onChange={()=>{}}>
            <ToggleButton className={"button__option"} value={1}>Inscritos</ToggleButton>
            <ToggleButton className={"button__option"} value={2}>No inscritos</ToggleButton>
            <ToggleButton className={"button__option"} value={3}>Todos</ToggleButton>
          </ToggleButtonGroup>
          </div>
        </Collapse>
      </div>
      <div className='eventos__topbar'>
        <h1>Eventos Disponibles</h1>

      </div>
    </div>
  )
}
