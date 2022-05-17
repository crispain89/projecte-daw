import React, { useState, useEffect, useRef } from 'react'
import Sidebar from '../Sidebar';
import Header from '../Header';
import Footer from '../Footer';
import { Button, Modal } from 'react-bootstrap'
//import '../../../css/estilosGrid.css'
import mapboxgl from 'mapbox-gl';
import Helmet from 'react-helmet';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';



export default function HomeLayout({ children, sidebar = false }) {
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
    <>
      <Helmet>
        <title>Cram page</title>
        <meta content="width=device-width, initial scale=1.0"
          name="viewport" />
        <meta content="" name="keywords" />
        <meta content="" name="description" />
      </Helmet>
      <div className="container__home">
        <Header>
          <div className='logo'>
            <img src='https://camo.githubusercontent.com/48d099290b4cb2d7937bcd96e8497cf1845b54a810a6432c70cf944b60b40c77/68747470733a2f2f7261776769742e636f6d2f676f72616e67616a69632f72656163742d69636f6e732f6d61737465722f72656163742d69636f6e732e737667'></img>
          </div>
          <h1>Cram Sports</h1>
          <Link className='link-light' style={{width:"125px",display:"flex",justifyContent:"flex-end"}} to={"/home"}>
            <FaHome size={"40px"}/>
          </Link>
        </Header>
        <section>
          {children}
        </section>
        
      </div>
    </>

  )
}