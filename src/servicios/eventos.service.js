import httpC from "../commons/js/httpConfig";
import ApiCrudService from "./crud.service";


export default class EventosService extends ApiCrudService{

    constructor(){
        super()
    }
    
    static getEventosByUser(id){
        return httpC.get(`/usuarios/${id}/eventos`)
    }
    
}
