import React, { useState ,useRef,useEffect } from 'react';
import './commons/css/estilosGrid.css'
import './App.css';
import mapboxgl from 'mapbox-gl';
/* import 'mapbox-gl/dist/mapbox-gl.css'; */
import PiePagina from './commons/js/PiePagina'
import {Modale} from './commons/js/Modal'
import logo from './logo.svg';
import {Login} from './commons/js/Login'
import {Register} from './commons/js/Register'
import {Button, Row, Col, Modal} from 'react-bootstrap'


mapboxgl.accessToken = "pk.eyJ1IjoiY2lzcGFpbjg5IiwiYSI6ImNsMmo4ZmxtbjBjem0zY3MzNG41em80MDkifQ.n3GnK0soJwz763xqSPVdoQ";
function App() {

const  [mostrar , setMostrar] = useState (false);
const [showModal, setShowModal] = useState (false);

const mapContainer = useRef(null);
const map = useRef(null);
const [lng, setLng] = useState(1.7266128);
const [lat, setLat] = useState(41.22375);
const [zoom, setZoom] = useState(14);

const handleToggleModal =()=> {
  setShowModal(!showModal);
};

useEffect(() => {
  console.log(mapContainer)
  if ( !showModal) return
  if (map.current) return; // initialize map only once
  map.current = new mapboxgl.Map({
    container: mapContainer.current || null,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [lng, lat],
    zoom: zoom
  });
});



  return (
    <div className="container__principal">
      <header>
        <h1 className="bienvenido">Bienvenidos a Cram</h1>
      </header>
      
      { mostrar ?
      <div className="container">
       <Register setMostrar={setMostrar} ver={mostrar}/> 
       </div>
       :
      <div className="container__login">
        <Login setMostrar={setMostrar} ver={mostrar}/>
      </div>
      }

        <Modal show={showModal} backdrop="static" fullscreen >
          <Modal.Header>
          <Modal.Title>Nuestra Ubicaciónn</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="fullwidth">
              <div ref={mapContainer} className="map__container" />
            </div>
          </Modal.Body>

          <Modal.Footer>
          <Button variant="secondary" onClick={()=>handleToggleModal()}>Cerrar</Button>

          </Modal.Footer>
      </Modal>


      {/* <Modale container={mapContainer} accio={handleToggleModal}/> */}

      <PiePagina accio={handleToggleModal}/>
     {/*  {mostrar ? <Button variant='outline-primary' onClick={()=>setMostrar(false)} name='Login'>Login</Button> 
      : 
      <Button className='boton__auxiliar' variant='outline-primary' onClick={()=>setMostrar(true)} name='Registrate'>Registrate</Button>} */}
     
      
    </div>
   
  )
}

export default App;
