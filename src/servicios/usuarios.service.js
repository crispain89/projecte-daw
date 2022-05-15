import ApiCrudService from "./crud.service";
import httpC from "./httpConfig";


export default class UsuariosService extends ApiCrudService{
    /* getAll(){
        return httpC.get("/usuarios");
    }

    get(id){
        return httpC.get(`/usuarios/${id}`);
    }
    create(data){
        return httpC.post("/usuarios", data);
    }
    update(id, data){
        return httpC.put(`/usuarios/${id}`, data);
    }
    delete(id){
        return httpC.delete(`/usuarios/${id}`);
    } */
    static updateAvatar(data,id){
        return httpC.put(`/file/${id}`,data)
    }
}
