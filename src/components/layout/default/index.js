import React, { useState, useEffect, useRef, useContext } from 'react'
import Content from '../Content'
import Sidebar from '../Sidebar';
import Header from '../Header';
import Footer from '../Footer';
import {GrLogout} from 'react-icons/gr'
import { Button, Modal } from 'react-bootstrap'
//import '../../../css/estilosGrid.css'
import mapboxgl from 'mapbox-gl';
import Helmet from 'react-helmet';
import LoadingSpinner from '../../Spinner';
import { AuthContext } from '../../context/AuthContext';
import SidebarCollapse from '../SidebarCollpase';



export default function Layout({ children, sidebar = false }) {
  const [showModal, setShowModal] = useState(false);
  const {logout, loading} = useContext(AuthContext)
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(1.7266128);
  const [lat, setLat] = useState(41.22375);
  const [zoom, setZoom] = useState(14);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const logoutSession = () =>{
    console.log("tusa")
    logout()
  }

  useEffect(() => {
    console.log("hola")
    if (!showModal) return
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current || null,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });
  });
  return (
    //Pagina de usuario de inicio
    <>
      <Helmet>
        <title>Cram page</title>
        <meta content="width=device-width, initial scale=1.0"
          name="viewport" />
        <meta content="" name="keywords" />
        <meta content="" name="description" />
      </Helmet>
      <div className="container__principal">
        <Header>
          <div className='logo'>
            <img src='https://camo.githubusercontent.com/48d099290b4cb2d7937bcd96e8497cf1845b54a810a6432c70cf944b60b40c77/68747470733a2f2f7261776769742e636f6d2f676f72616e67616a69632f72656163742d69636f6e732f6d61737465722f72656163742d69636f6e732e737667'></img>
          </div>
          <GrLogout onClick={logoutSession} size={"40px"} ></GrLogout>
        </Header>
        {/* Menu de la Izquierda */}
        <Sidebar />
        {/* Contenido donde va aparecer la infromacion de los servicio */}
        <section>
          {children}
        </section>

        {/* Modal de loading */}
        <Modal
          contentClassName='modal__spinner'
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={loading}
        >
          <Modal.Body style={{backgroundColor:"transparent"}}>
            <LoadingSpinner/>
          </Modal.Body>
        </Modal>
        
        {/* Modal de mapa */}

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
            <Button variant="secondary" onClick={handleToggleModal}>Cerrar</Button>

          </Modal.Footer>
        </Modal>
        <Footer accio={handleToggleModal} />
      </div>
    </>

  )
}