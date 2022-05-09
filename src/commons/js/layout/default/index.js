import React, { useState, useEffect, useRef } from 'react'
import Content from '../Content'
import Sidebar from '../Sidebar';
import Header from '../Header';
import Footer from '../Footer';

import { Button, Modal } from 'react-bootstrap'
import '../../../css/estilosGrid.css'
import mapboxgl from 'mapbox-gl';
import Helmet from 'react-helmet';



export default function Layout({ children, sidebar = false }) {
  const [showModal, setShowModal] = useState(false);

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(1.7266128);
  const [lat, setLat] = useState(41.22375);
  const [zoom, setZoom] = useState(14);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
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
        <Header />
        {/* Menu de la Izquierda */}
        <Sidebar />
        {/* Contenido donde va aparecer la infromacion de los servicio */}
        <section>
          {children}
        </section>
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