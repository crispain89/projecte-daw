import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import React, {useState, useEffect} from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
//import '../css/estilosGrid.css'

export default function Home() {
  return(
    <Parallax pages={1.5} style={{top:"0",left:"0"}}>
        <ParallaxLayer 
          style={{
            backgroundImage: `url(https://images2.alphacoders.com/120/1209425.png)`,
            backgroundSize: "cover"
          }} 
          offset={0}
          speed={1}
          factor={2}
        />
        <ParallaxLayer
          offset={0} 
          speed={0.5}
          style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            flexDirection:"column",
            margin:"0 auto",
            color:"white",
          }}
        > 
          <h1 style={{fontSize:"6rem"}}>CRAM SPORTS</h1>
          <h3 className='text-light'>Tu web de eventos favorita</h3>
          <a href="#cositas" className='link-info'>Conocer más...</a>
        </ParallaxLayer>

        <ParallaxLayer
          offset={0.8} 
          speed={0.7}
          style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            flexDirection:"column",
            margin:"0 auto",
            color:"white",
            textAlign:"center"
          }}
        > 
          <div className='home__buttons' id="cositas">
            <h4>Con Cram Sports podrás acceder facilmente a los eventos a los que estas inscrito, además de poder ver tus promociones disponibles, todo en una misma app</h4>
            <h2>CREA UNA CUENTA EN UN ÚNICO PASO:</h2>
            <Link to="/register" className="btn btn-primary" >Registrate</Link>
            <h5>Ya estas inscrito?</h5>
            <Link to="/login" className="btn btn-secondary" >Iniciar Sesion</Link>
          </div>
        </ParallaxLayer>

        
        
    </Parallax>
  )
}
//<img src="https://img.europapress.es/fotoweb/fotonoticia_20211003143235_1200.jpg"/>