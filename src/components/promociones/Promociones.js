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
  const [filteredPromociones, setFilteredPromociones] = useState([])
  //guardamos las promociones de un usuario
 

  const renderPromociones = () => {
    //Renderizamos los eventos dependiendo del filtro de tipo: "inscrito" | "no inscrito" | "todos"
    //Este filtro se encuentra en el componente Filters y le pasamos el resultado a este componente
  
    console.log("filteredPromociones",filteredPromociones)
    console.log(promociones)
    return promociones.map((promocion)=>{
     

        return <Promocion key={promocion.id} titulo={promocion.titulo} descripcion={promocion.descripcion} inicio={promocion.fecha_inicio} src={promocion.src} final={promocion.fecha_expiracion}/>
    
    })
  }

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
      <Filters setPromociones={setFilteredPromociones} filteredPromociones={filteredPromociones} promociones={promociones} open={open} setOpen={setOpen}/>
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
