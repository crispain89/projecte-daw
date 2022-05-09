import React, { useState ,useRef,useEffect , createContext,useContext} from 'react';
import Tarjeta from './Tarjeta';
import '../css/estilosGrid.css'
import imageEvent1 from '../multimedia/eventos/hestaAran.jpg';
import imageEvent2 from '../multimedia/eventos/MarxaBeret.jpg';
import imageEvent3 from '../multimedia/eventos/utmbValle.png';
import imageEvent4 from '../multimedia/eventos/nocheVieja.jpeg';

export default function MainPage() {

  console.log("hola")
const images =[
  {
    src:imageEvent1,
    title: 'Eventos',
    subtitle: "Hèsta d'Aran",
    alt:"foto de la fiesta de Aran el 17 de Julio"
  },
  {
    src:imageEvent2,
    title: 'Eventos',
    subtitle: "Marxa Beret",
    alt:"foto de la marxa beret en Febrero"
  },
  {
    src:imageEvent3,
    title: 'Eventos',
    subtitle: "Utmb Vielha",
    alt:"foto Utmb que se hace en el Valle de Aran"
  },
  {
    src:imageEvent4,
    title: 'Eventos',
    subtitle: "Bajada de antorchas",
    alt:"Bajada de antorchas en Baqueira/Beret"
  }
];
console.log(images)
const [image, setImage]= useState(images[0]);
const imageRef = useRef(images.src);
const titleRef = useRef(images.title);
const subtitleRef = useRef(images.subtitle);
const altRef = useRef(images.alt);

function imageChange(n) {
  setImage(images[n], titleRef, subtitleRef, altRef);
  imageRef.current=images.src;
  titleRef.current = images.title;
  subtitleRef.current = images.subtitle;
  altRef.current = images.alt;
}
function timer(){
  var n=0;
  return setInterval(()=>{
    if(n>images.length -1){
      n=0;
    };
    imageChange(n);
    n++;
  },3000)
}
useEffect(() => {
  const timerId=timer();
  return()=> {clearInterval(timerId)
  },[]
});


  return(
   <>
      <Tarjeta src={ imageRef.current } alt={ altRef.current} title={titleRef.current } subtitle={subtitleRef.current}/>
      {/* <Tarjeta /> */}
{/*       <Tarjeta imagenes={}/> */}
   </>
  )
}

