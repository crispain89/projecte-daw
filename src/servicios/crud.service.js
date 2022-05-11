import httpC from "../commons/js/httpConfig";


export default class ApiCrudService{

    static index(resource) {
        return httpC.get(`/${resource}`)
    }
   
}