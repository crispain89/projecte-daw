import React, { useState,useEffect, useCallback, useContext } from 'react'
import ComerciosService from '../../servicios/comercios.service.js';
import PromocionesService from '../../servicios/promociones.service.js.js';
import Filters from './Filters'
import { AuthContext } from '../context/AuthContext';
//import Filters from '../eventos/Filters';
import Promocion from './TarjetaPromociones';
//En esta pagina se mostraran todos los eventos de la aplicacion, por orden alfabetico o proximidad,
//por defecto, la lista mostrará primero los eventos a los que estas inscrito y los diferenciará de los otros
//con una etiqueta verde de "inscrito" 
//Además, se podrá filtrar por inscritos o no inscritos, para que la busqueda sea mas sencilla




export default function Promociones({className, ...rest}) {
  const {user, loading, setLoading} = useContext(AuthContext)
  const [open, setOpen] = useState(false);
  const [promociones, setPromociones] = useState([]);
  const [promocionesCaducadas, setPromocionesCaducadas] = useState([]);
  const [filteredPromociones, setFilteredPromociones] = useState([])
  const [selected, setSelected] = useState(0)
  //guardamos las promociones de un usuario
 
  /* functionDate(fechaPromo){
    var date=new Date();
    let year= date.getFullYear();
    let month=date.getMonth();
    let day= date.getDate();
  
    var dateParts = fechaPromo.split("-");
    var datePromo= (dateParts[2]+"/"+dateParts[1]+"/"+dateParts[0]).toString();
    var dateNow=[day,month,year].join('/');
    if(datePromo<dateNow){
      return false
    }
    else {
      return true}
    
  } */

  const renderPromociones = () => {
    //Renderizamos los eventos dependiendo del filtro de tipo: "inscrito" | "no inscrito" | "todos"
    //Este filtro se encuentra en el componente Filters y le pasamos el resultado a este componente
  
    console.log("filteredPromociones",filteredPromociones)
    console.log("PROMOS",promociones)
    
    switch(selected){
      case 1:
        //Caducadas
        return promocionesCaducadas.map((promocion)=>{
          return <Promocion key={promocion.id} caducado={true} titulo={promocion.titulo} comercio={promocion.comercio_nombre} evento={promocion.evento_nombre} descripcion={promocion.descripcion} inicio={promocion.fecha_inicio} src={promocion.src} final={promocion.fecha_expiracion}/>
        })
      case 2:
        //Vigentes
        return filteredPromociones
        .filter(promo=>{
          return !promocionesCaducadas.find(p => p.id === promo.id)
        }).map((promocion)=>{
          return <Promocion key={promocion.id} caducado={false} titulo={promocion.titulo} comercio={promocion.comercio_nombre} evento={promocion.evento_nombre} descripcion={promocion.descripcion} inicio={promocion.fecha_inicio} src={promocion.src} final={promocion.fecha_expiracion}/>
        })
      case 3:
      default:
        //todos
        return filteredPromociones.map((promocion)=>{
          let caducado = false;
          var date1 = Date.parse(promocion.fecha_expiracion)
          var date2 = Date.now()
          if (date1 < date2) caducado=true;
          return <Promocion key={promocion.id} caducado={caducado} titulo={promocion.titulo} comercio={promocion.comercio_nombre} evento={promocion.evento_nombre} descripcion={promocion.descripcion} inicio={promocion.fecha_inicio} src={promocion.src} final={promocion.fecha_expiracion}/>
        })
    }
  }

  useEffect(() => {
    if(promociones.length > 0) return
    async function getPromociones (){
      try{
        //Loading del modal a true
        setLoading(true)
        const userPromociones= await PromocionesService.getPromocionesByUser(user.id);
        const userPromocionesCaducadas= await PromocionesService.getPromocionesExpiredByUser(user.id);
        console.log("USERPROMOS",userPromociones.data)
        console.log("CADUCADAS",userPromocionesCaducadas.data)
        //le pasamos el id del comercio que tiene la promocion.
        const comercio= await ComerciosService.show("comercios",promociones.comercio_id);
        setPromocionesCaducadas(userPromocionesCaducadas.data)
        setPromociones(userPromociones.data)
        setFilteredPromociones(userPromociones.data)
      }catch(err){
        console.log(err)
      }
      finally{
        //Pase lo que pase loading del modal a false
        setLoading(false)
      }
    }
    getPromociones();
    return () => getPromociones();
  },[])

  return (
    <div>
      <Filters setSelected={setSelected} selected={selected} setPromociones={setFilteredPromociones} filteredPromociones={filteredPromociones}  promociones={promociones} open={open} setOpen={setOpen}/>
      <div className='eventos__topbar'>
        <div className='eventos'>
          { 
            filteredPromociones.length > 0 
            ?
              <>
                <h1>Promociones Disponibles</h1>
                {renderPromociones()}
              </>
            :
            <h1>No hemos encontrado ningun resultado</h1>
          }
          
        </div>
      </div>
    </div>
  )
}
