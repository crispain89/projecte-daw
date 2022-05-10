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
    useEffect(() => {
        setIsAuthenticated(!!localStorage.getItem("token"));
    //check authentication
  }, [])
    return {
        isAuthenticated,
        isLogged(){return !!localStorage.getItem("token")},
        user,
        login (userData,token)  {
            console.log("USERDATA",userData)
            const {email,id,nombre} = userData
            setUser({email, id, nombre})
            // your authentication logic
            setIsAuthenticated(true)
            localStorage.setItem("token",token)
            localStorage.setItem('user',JSON.stringify(userData))
            const origin = location.state?.from?.pathname || '/user';
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