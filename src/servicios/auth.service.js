import httpConfig from "../commons/js/httpConfig";


class AuthService{
    signup(data){
        return http.post("/auth/register", data);
    }
    signin(data){
        return http.post("/auth/login", data);
    }
    signout(){

        /* tien que enrutar el logout */
        return http.get("/auth/logout")
    }
}
