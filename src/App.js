import React, { useState ,useRef,useEffect , createContext,useContext} from 'react';
import './commons/css/estilosGrid.css'
import './App.css';
import mapboxgl from 'mapbox-gl';
/* import 'mapbox-gl/dist/mapbox-gl.css'; */
import PiePagina from './commons/js/PiePagina'
import {Login} from './commons/js/Login'
import {Register} from './commons/js/Register'
import {Button, Modal} from 'react-bootstrap'
import {BrowserRouter as Router, Route, Routes ,Link} from 'react-router-dom'
import { UserContext } from './UserContext';
import ForgotPassword from './commons/js/ForgotPassword';
import EmailVerification from './commons/js/EmailVerification';
import ResetPassword from './commons/js/ResetPassword';



mapboxgl.accessToken = "pk.eyJ1IjoiY2lzcGFpbjg5IiwiYSI6ImNsMmo4ZmxtbjBjem0zY3MzNG41em80MDkifQ.n3GnK0soJwz763xqSPVdoQ";
function App() {

const [user, setUser]=useState({id:null, email:null})
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
    <Router>
      <UserContext.Provider value={{user, setUser}}>
      <div className="container__principal">
        <header>
          <h1 className="bienvenido">Bienvenidos a Cram</h1>
        </header>
        <Routes>
          <Route path='/register' element={<Register/>}/>
          <Route path='/' element={<Login/>}/>
          {/* Ruta del Login */}
          <Route path='/login' element={<Login/>}/>
          <Route path='/forgot' element={<ForgotPassword/>}/>
          <Route path='/forgot/email-verification' element={<EmailVerification/>}/>
          <Route path='/forgot/email-verification/:email' element={<EmailVerification/>}/>
          <Route path='/forgot/password-reset' element={<ResetPassword/>}/>
          
        </Routes>
        



        {/* /////////////////////////////////////////////////////////////////////// */}
          {/* Si estas Autenticado aqui vendrán las páginas que se puedan acceder */}
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
      </UserContext.Provider>
    </Router>
  )
}

export default App;
