import { Button, Card ,Badges, Badge} from "react-bootstrap";

export default function Promocion({inicio, final, titulo,descripcion,src}){
    
    return(
        <Card>
            <Card.Body>
                <div className='card__evento'>
                    <Card.Img className='imagen__card' variant="top" src={src} />
                    <div className='card__body'>
                        {/* Poner el nombre del comercio */}
                        <Card.Title>{titulo}</Card.Title>
                        {console.log(src)}
                        <Card.Text>
                            <li> {descripcion}</li>
                            <br />
                            <li>La promoción estará disponible desde : <span className='card__styleInfo'>{inicio}</span></li>
                            <li>La promoción expirará: <span className='card__styleInfo'>{final}</span></li>
                        </Card.Text>

                    </div>
                </div>
                <Button variant="primary">ver promocion</Button>
               
            </Card.Body>
        </Card>
    )
}