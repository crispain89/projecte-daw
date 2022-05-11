import { Button, Card } from "react-bootstrap";

export default function Evento({nombre,edicion,lugar,src}){

    return(
        <Card>
            <Card.Header>Evento</Card.Header>
            <Card.Body>
                <Card.Title>{nombre}{edicion}</Card.Title>
                {console.log(src)}

                <Card.Img className='imagen__card' variant="top" src={src} />
                {console.log(src)}
                <Card.Text>
                    
                    <li>{lugar}</li>
                    

                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    )
}