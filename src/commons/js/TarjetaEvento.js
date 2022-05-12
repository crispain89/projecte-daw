import { Button, Card ,Badges} from "react-bootstrap";

export default function Evento({nombre,edicion,descripcion,inicio,final,lugar,src}){

    return(
        <Card>
            
            <Card.Body>
                <div className='card__evento'>
                    <Card.Img className='imagen__card' variant="top" src={src} />
                    <div className='card__body'>
                        <Card.Title>{nombre}{edicion}</Card.Title>
                        {console.log(src)}
                        <Card.Text>
                        <li> {descripcion}</li>
                        <br />
                        <li>El evento se realizará en : <span className='card__styleInfo'>{lugar}</span></li>
                        <li>El evento se realizará el: <span className='card__styleInfo'>{inicio}</span></li>
                        <li> El evento finalizará el: <span className='card__styleInfo'>{final}</span></li>
                        </Card.Text>

                    </div>
                </div>
                <Button variant="primary">ver evento</Button>
            </Card.Body>
        </Card>
    )
}