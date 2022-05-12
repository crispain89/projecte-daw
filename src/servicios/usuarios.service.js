import httpC from "./httpConfig";


class UsuariosService{
    getAll(){
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
    }
    
}
