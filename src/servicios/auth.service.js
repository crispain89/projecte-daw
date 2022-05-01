import httpC from "../commons/js/httpConfig";


export default class AuthService{

    static signup(data){
        console.log(data)
        return httpC.post("/auth/register", data);
    }
    static async signin(data){
        console.log(httpC)
        console.log("data",data)
        return await httpC.post("/auth/login", data);
    }
    static signout(){
        /* tien que enrutar el logout */
        return httpC.post("/auth/logout")
    }
}
