import React, {useState, useEffect}from 'react'
import {Card, ListGroup,ListGroupItem} from 'react-bootstrap'

export default function Tarjeta({src,alt, title, subtitle}) {


    /* haremos un map y mostraremos las fotos de forma random */
    
  return (
    <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={src} alt={alt}/>
        <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>
            {subtitle}
            </Card.Text>
        </Card.Body> 
    </Card>
  )
}
