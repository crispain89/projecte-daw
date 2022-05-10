import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import {useSearchParams, useNavigate} from 'react-router-dom'
import Tarjeta from './Tarjeta';
import '../css/estilosGrid.css'
import imageEvent1 from '../multimedia/eventos/hestaAran.jpg';
import imageEvent2 from '../multimedia/eventos/MarxaBeret.jpg';
import imageEvent3 from '../multimedia/eventos/utmbValle.png';
import imageEvent4 from '../multimedia/eventos/nocheVieja.jpeg';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export default function MainPage() {

  const images = [
    {
      src: "https://www.tuscasasrurales.com/blog/wp-content/uploads/2019/10/viella-valle-de-aran.jpg",
      title: 'Eventos',
      subtitle: "Hèsta d'Aran",
      alt: "foto de la fiesta de Aran el 17 de Julio"
    },
    {
      src: "https://www.vvelascocorreduria.es/wp-content/uploads/2017/01/autocaravana-valledearan-vielha2-768x568.jpg",
      title: 'Eventos',
      subtitle: "Marxa Beret",
      alt: "foto de la marxa beret en Febrero"
    },
    {
      src: "https://guias-viajar.com/wp-content/uploads/2017/07/valle-aran-bagergue-001.jpg",
      title: 'Eventos',
      subtitle: "Utmb Vielha",
      alt: "foto Utmb que se hace en el Valle de Aran"
    },
    {
      src: "https://dygzg43zaf35p.cloudfront.net/Baqueira/var/cache/images/600x_o_GUIA-para-Vivir-en-el-Valle-de-Aran-TODO-lo-que-Necesitas_p442.jpg",
      title: 'Eventos',
      subtitle: "Bajada de antorchas",
      alt: "Bajada de antorchas en Baqueira/Beret"
    }
  ];
  const {user} = useContext(AuthContext);
  const [image, setImage] = useState(images[0]);
  const imageRef = useRef(image.src);
  const titleRef = useRef(image.title);
  const subtitleRef = useRef(image.subtitle);
  const altRef = useRef(image.alt);
  let navigate = useNavigate()

  function imageChange(n) {
    let newImage = images[n]
    setImage(newImage);

    //navigate(`/forgot/email-verification/${searchParams.get('image')}`)
    imageRef.current = newImage.src;
    titleRef.current = newImage.title;
    subtitleRef.current = newImage.subtitle;
    altRef.current = newImage.alt;
  }
  function timer() {
    var n = 0;
    return setInterval(() => {
      if (n > images.length - 1) {
        n = 0;
      };
      imageChange(n);
      n++;
    }, 3000)
  }
  useEffect(() => {
    const timerId = timer();
    //cleanUp function sirve para cancelar las cosas asincronas que esten pendientes.
    return () => clearInterval(timerId)
  }, []);



  return (
    <div className="container h-100 ">
      <div className="row">
        <div className="col-lg-4 col-md-6">
          <Tarjeta src={imageRef.current} alt={altRef.current} title={titleRef.current} subtitle={subtitleRef.current} />
          {/* Al hacer click aqui te irias a una página donde estaria todos los eventos que hay disponibles. */}
          <Link to={`/user/${user.id}/eventos`}>Ver todos los eventos</Link>
        </div>
        <div className="col-lg-4 col-md-6">
          <Tarjeta src={"https://d2f0ora2gkri0g.cloudfront.net/9d/d5/9dd59804-f004-491c-911e-cc7e1dc3f2a4.png"} alt={altRef.current} title={"Promociones"} subtitle={" Promociones de tus eventos"} />
          {/* Al hacer click aqui te irias a una página donde estaria todos las PRMOCIONES que hay disponibles. */}
          <Link to={"/home"}>Ver todos los descuentos</Link>
        </div>
        <div className="col-lg-4 col-md-12">
          <Tarjeta src={imageRef.current} alt={altRef.current} title={"Noticias"} subtitle={" Noticias de los eventos"} />
          {/* Al hacer click aqui te irias a una página donde estaria todas las Noticias que hay disponibles. */}
          <Link to={"/home"}>Ver noticias locales</Link>
        </div>

      </div>
    </div>
  )}

