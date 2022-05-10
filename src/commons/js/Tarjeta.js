import React, {useState, useEffect}from 'react'
import {Card, ListGroup,ListGroupItem} from 'react-bootstrap'

export default function Tarjeta({src,alt, title, subtitle}) {

    /* haremos un map y mostraremos las fotos de forma random */
    
  return (
    <Card  >
        <Card.Img className='card__image' variant="top" width="100%" height="225px" src={src} alt={alt}/>
        <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>
            {subtitle}
            </Card.Text>
        </Card.Body> 
    </Card>
  )
}
