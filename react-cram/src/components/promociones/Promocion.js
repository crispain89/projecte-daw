import React, {useContext, useEffect, useState} from 'react';
import { Badge, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import PromocionesService from '../../servicios/promociones.service.js';
import { AuthContext } from '../context/AuthContext';

const Promo = () =>{
    const {user} = useContext(AuthContext)
    const {id} = useParams()
    const [promoData,setPromoData] = useState([])
    let navigate = useNavigate()

    useEffect(()=>{
        (async ()=>{
            try{
                const res = await PromocionesService.getPromo(user.id,id)
                console.log("res",res)
                if ( res.status === 200 ){
                    setPromoData(res.data)
                }
                const userPromocionesCaducadas = await PromocionesService.getPromocionesExpiredByUser(user.id);
                console.log(userPromocionesCaducadas)
                if ( userPromocionesCaducadas.find(promo=>promo.id === promoData.id) ){
                    setPromoData({...res.data,caducado:true})
                }

            }
            catch(e){
                console.log("Error ",e)
            }
        })()
    },[])

    return (
        <Card style={{
            height:"100%",
            background: "rgb(108,172,255)",
background: "linear-gradient(180deg, rgba(108,172,255,1) 17%, rgba(141,235,255,1) 89%)",
        }}>
            <Card.Body>
                <div style={{height:"100%",flexDirection:"column",justifyContent:"space-around"}} className='card__evento'>
                        {/* Poner el nombre del comercio */}
                        <h1>{promoData.titulo}</h1>
                        <Card.Text style={{display:"flex",gap:"16px"}}>
                            <Card.Img style={{width:"500px"}} variant="top" src={promoData.src} />
                            <div style={{display:"flex",flexDirection:"column",gap:"16px"}}>
                                <span> {promoData.descripcion}</span>
                                <span> Comercio: <span className='card__styleInfo'>{promoData.comercio_nombre}</span></span>
                                <span>Conseguida por participar en el evento: <span className='card__styleInfo'>{promoData.evento_nombre}</span></span>
                                <span>La promoción estará disponible desde : <span className='card__styleInfo'>{promoData.fecha_inicio}</span></span>
                                <span>La promoción expirará: <span className='card__styleInfo'>{promoData.fecha_expiracion}</span></span>
                                {
                                    promoData.caducado
                                    ? 
                                        <Badge bg="danger">
                                            Expirada
                                        </Badge> 
                                    :
                                        <Badge bg="success">
                                            Vigente
                                        </Badge>
                                }

                            </div>
                        </Card.Text>
                        <div style={{display:"flex", borderRadius: "16px",margin:"0 auto",justifyContent:"space-around",backgroundColor:"rgb(173 211 233)",width:"30%",padding:"16px"}}>
                            <Link className="btn btn-secondary" to="/user/promociones">Volver atrás</Link>
                            

                        </div>

                    </div>
            </Card.Body>
        </Card>
      )
}

export default Promo;