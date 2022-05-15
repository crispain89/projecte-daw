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
  console.log("user in Promociones",user)
  const [open, setOpen] = useState(false);
  const [promociones, setPromociones] = useState([]);
  const [promocionesCaducadas, setPromocionesCaducadas] = useState([]);
  const [filteredPromociones, setFilteredPromociones] = useState([])
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
    console.log(promociones)
    /* var f = new Date();
      f.getFullYear()+"/"+f.getMonth()+"/"+getDate(); */
    
    return promociones.map((promocion)=>{
      let caducado=false;
      var date1= Date.parse(promocion.fecha_expiracion)
      console.log(date1)
      var date2= Date.now()
      console.log(date2)
      if(date1<date2){
        caducado=true;
      }
      return <Promocion key={promocion.id} caducado={caducado} titulo={promocion.titulo} comercio={promocion.comercio_nombre} evento={promocion.evento_nombre} descripcion={promocion.descripcion} inicio={promocion.fecha_inicio} src={promocion.src} final={promocion.fecha_expiracion}/>
      
    })
  }
  useEffect(() => {
    if(promocionesCaducadas.length > 0)return
    async function getPromocionesCaducadas(){
      try{
        setLoading(true);
        const userPromocionesCaducadas= await PromocionesService.getPromocionesExpiredByUser(user.id);
        console.log("Promos CADUCADAS", userPromocionesCaducadas)
      }catch(e){}
    }
  })
  useEffect(() => {
    if(promociones.length > 0) return
    async function getPromociones (){
      try{
        //Loading del modal a true
        setLoading(true)
        const userPromociones= await PromocionesService.getPromocionesByUser(user.id);
        console.log("USERPROMOS",userPromociones.data)
        //le pasamos el id del comercio que tiene la promocion.
        const comercio= await ComerciosService.show("comercios",promociones.comercio_id);
        console.log(' comercio', comercio.data)
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
      <Filters setPromociones={setFilteredPromociones} filteredPromociones={filteredPromociones}  promociones={promociones} open={open} setOpen={setOpen}/>
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
