import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import React, {useState, useEffect} from 'react'
import '../css/estilosGrid.css'

export default function Home() {
  return(
    <Parallax pages={4}>
        <ParallaxLayer 
          style={{
            backgroundImage: `url(https://free-images.com/or/77e1/clouds_clouds_above_sky.jpg`,
            backgroundSize: "cover"
          }} 
          offset={0}
          speed={1}
          factor={2}
        />
        <ParallaxLayer
          offset={2} 
          speed={1}
          factor={4}
          style={{
            backgroundImage: `url(https://image.winudf.com/v2/image/Y29tLndhbGxwYXBlci5wYXJyYWxleC5TdW5zZXRwYXJhbGxheHdhbGxwYXBlcl9zY3JlZW5fMF8xNTIxMTcxODA0XzA4NQ/screen-0.jpg?fakeurl=1&type=.jpg)`,
            backgroundSize: "cover"
          }} 
        /> 
        <ParallaxLayer
          offset={0.2} 
          speed={0.5}
          factor={4}
        > 
            <h1>MIcaracuando micara</h1>
        </ParallaxLayer>
        <ParallaxLayer
          offset={3.2} 
          speed={2}
        > 
            <h1>Los cromañones</h1>
        </ParallaxLayer>
    </Parallax>
  )
}
//<img src="https://img.europapress.es/fotoweb/fotonoticia_20211003143235_1200.jpg"/>