import ApiCrudService from "./crud.service";
import httpC from "./httpConfig";


export default class EventosService extends ApiCrudService{

    constructor(){
        super()
    }
    
    static getEventosByUser(id){
        return httpC.get(`/usuarios/${id}/eventos`)
    }
    
}
