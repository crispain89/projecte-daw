import httpC from "./httpConfig";
import ApiCrudService from "./crud.service";


export default class PromocionesService extends ApiCrudService{

    constructor(){
        super()
    }
    
    static getPromocionesByUser(id){
         return httpC.get(`/usuarios/${id}/promociones`)
    //le pasare el id de comercio que lo tiene la promcion
    
    
    }
    static getPromocionesExpiredByUser(id){
        return httpC.get(`/usuarios/${id}/promociones`)
   //le pasare el id de comercio que lo tiene la promcion
   
   }
}
