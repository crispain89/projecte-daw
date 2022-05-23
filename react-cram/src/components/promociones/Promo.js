import React, {useContext, useEffect, useRef, useState} from 'react';
import { Badge, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import PromocionesService from '../../servicios/promociones.service.js.js';
import { AuthContext } from '../context/AuthContext';
import {BsDownload} from 'react-icons/bs'

const Promo = () =>{
    const {user} = useContext(AuthContext)
    const {id} = useParams()
    const [promoData,setPromoData] = useState([])
    let navigate = useNavigate()

    const redirectEvento = () => {
        navigate(`/user/eventos/${promoData.id_evento}`)
    }

    useEffect(()=>{
        (async ()=>{
            try{
                const res = await PromocionesService.getPromo(user.id,id)
                console.log("res",res)
                if ( res.status === 200 ){
                    setPromoData(res.data)
                }
                const userPromocionesCaducadas = await PromocionesService.getPromocionesExpiredByUser(user.id);
                console.log("caducadas",userPromocionesCaducadas)
                if ( userPromocionesCaducadas.data.find(promo=>promo.id === res.data.id) ){
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
                <div style={{height:"100%",flexDirection:"column",justifyContent:"space-around",position:"relative"}} className='card__evento'>
                        {/* Poner el nombre del comercio */}
                        <h1>{promoData.titulo}</h1>
                        <img style={{width:"200px",height:"200px",position:"absolute",right:"0px",top:"0px"}} src="https://res.cloudinary.com/dhdbik42m/image/upload/v1653246688/websiteQRCode_noFrame_vcjzxh.png"></img>
                        <Card.Text style={{display:"flex",gap:"16px"}}>
                            <Card.Img style={{width:"500px"}} variant="top" src={promoData.src} />
                            <div style={{display:"flex",flexDirection:"column",gap:"16px"}}>
                                <span><strong>Descripcion:</strong> {promoData.descripcion}</span>
                                <span> <strong>Comercio:</strong> <span >{promoData.comercio_nombre}</span></span>
                                <span><strong>Evento asignado:</strong> <span>{promoData.evento_nombre}</span> <br/><a  className="link-primary" onClick={redirectEvento}>Ver evento</a></span>
                                <span><strong>La promoción estará disponible desde :</strong> <span>{promoData.fecha_inicio}</span></span>
                                <span><strong>La promoción expirará: </strong><span>{promoData.fecha_expiracion}</span></span>
                                <strong>Estado: </strong>
                                {
                                    promoData.caducado
                                    ? 
                                    <Badge style={{width:"100px"}} bg="danger">
                                            Expirada
                                        </Badge> 
                                    :
                                        <Badge style={{width:"100px"}} bg="success">
                                            Vigente
                                        </Badge>
                                }

                            </div>
                        </Card.Text>
                        <div style={{display:"flex", borderRadius: "16px",margin:"0 auto",justifyContent:"space-around",backgroundColor:"rgb(173 211 233)",width:"30%",padding:"16px"}}>
                            <Link className="btn btn-secondary" to="/user/promociones">Volver atrás</Link>
                            <Button className="btn btn-primary" >Descargar pdf <BsDownload></BsDownload> </Button>
                            

                        </div>

                    </div>
            </Card.Body>
        </Card>
      )
}

export default Promo;