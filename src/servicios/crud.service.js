import httpC from "./httpConfig";


export default class ApiCrudService{

    static index(resource) {
        return httpC.get(`/${resource}`)
    }
   
}