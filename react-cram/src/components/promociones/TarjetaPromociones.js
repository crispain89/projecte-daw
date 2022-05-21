import { Button, Card ,Badges, Badge} from "react-bootstrap";

export default function Promocion({ onClick, caducado,titulo,comercio, evento,descripcion, inicio, src,final}){
    
    return(
        <Card onClick={onClick}>
            <Card.Body>
                <div className='card__evento'>
                    <Card.Img className='imagen__card' variant="top" src={src} />
                    <div className='card__body'>
                        {/* Poner el nombre del comercio */}
                        <Card.Title>{titulo}</Card.Title>
                        <Card.Text>
                            <li> {descripcion}</li>
                            <br />
                            <li> Comercio: <span className='card__styleInfo'>{comercio}</span></li>
                            <li>Conseguida por participar en el evento: <span className='card__styleInfo'>{evento}</span></li>
                            <li>La promoción estará disponible desde : <span className='card__styleInfo'>{inicio}</span></li>
                            <li>La promoción expirará: <span className='card__styleInfo'>{final}</span></li>
                        </Card.Text>

                    </div>
                </div>
                <Button variant="primary">ver promocion</Button>
                {
                    caducado
                    ? 
                        <Badge bg="danger">
                            Expirada
                        </Badge> 
                    :
                        <Badge bg="success">
                            Vigente
                        </Badge>
                }
               
            </Card.Body>
        </Card>
    )
}