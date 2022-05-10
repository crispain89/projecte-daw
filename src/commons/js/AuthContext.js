import React, { useState ,useRef,useEffect , createContext,useContext} from 'react';
import { useNavigate } from 'react-router';
import AuthService from '../../servicios/auth.service';
import {
  useLocation,
} from 'react-router-dom';
const AuthContext = createContext(null)




function useAuth(){
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser]=useState({id:null, email:null, nombre:null})
    const navigate = useNavigate();
    const location = useLocation();
    const expireTime =  Date.now() + 604800

    useEffect(() => {
        if ( localStorage.getItem("token") ){
            let resta = JSON.parse(localStorage.getItem('token')).expireTime - new Date()
            let expired = JSON.parse(localStorage.getItem('token')).expireTime - new Date() <= 0
            console.log("EXPIRED",resta )
            console.log("EXPIRED",expired )
            setIsAuthenticated(!expired)
        }
    }, [])
    return {
        isAuthenticated,
        isLogged(){return !!localStorage.getItem("token")},
        user,
        login (userData,token,remember)  {
            console.log("USERDATA",userData)
            const {email,id,nombre} = userData
            setUser({email, id, nombre})
            // your authentication logic
            setIsAuthenticated(true)
            if( remember ){
                //1 semana de inicio de sesion
                localStorage.setItem("token",JSON.stringify({token,expireTime}))
            }else{
                localStorage.setItem("token",JSON.stringify({token,expireTime:0}))
            }
            localStorage.setItem('user',JSON.stringify(userData))
            const origin = location.state?.from?.pathname || '/user';
            console.log("ORIGIN",origin)
            console.log("LOCATION",location)
            navigate(origin);
        },
        logout ()  {
            // your logout logic
            setIsAuthenticated(false)
            if ( !!localStorage.getItem("token") ){
                localStorage.removeItem("token")
            }
            if ( !!localStorage.getItem("user") ){
                localStorage.removeItem("user")
            }
            navigate("/login")
        }
        
    }
}


const AuthContextProvider = (props) => {
    const auth = useAuth();
    return (
        <AuthContext.Provider value={auth}>
           {props.children}
        </AuthContext.Provider>
    )
}
  const AuthConsumer = AuthContext.Consumer

export {
    AuthContext,
    AuthContextProvider,
    useAuth,
    AuthConsumer
}