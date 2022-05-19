import ApiCrudService from "./crud.service";
import httpC from "./httpConfig";


export default class EventosService extends ApiCrudService{

    constructor(){
        super()
    }
    
    static getEventosByUser(id){
        return httpC.get(`/usuarios/${id}/eventos`)
    }
    static getEventosCurrent(){
        return httpC.get(`/eventos?active=true`)
    }
    static updatePhoto(data,id){
        return httpC.put(`/file/${id}`,data)
    }
}