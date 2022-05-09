import React, { useState ,useRef,useEffect , createContext,useContext} from 'react';
import { useNavigate } from 'react-router';
import AuthService from '../../servicios/auth.service';

const AuthContext = createContext(null)


const AuthContextProvider = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser]=useState({id:null, email:null, nombre:null})
    let navigate = useNavigate()
    useEffect(()=>{
        console.log("USER AUTH",isAuthenticated)
        console.log("USER",user)
    },[user,isAuthenticated])

    const setAuthStatus = async () =>{
        try{    
            const res = await AuthService.userIsAuth()
            console.log("RES",res)
            if ( res.data.auth === true ){
                setIsAuthenticated(true)
                return true
            }
        }
        catch(e){
            if ( e.response.data.auth === false ){
                setIsAuthenticated(false)
                return false
            }
            console.log(e)
        }

    }

    const login = (token) => {
        // your authentication logic
        setIsAuthenticated(true)
        localStorage.setItem("token",token)
        navigate("/user")
    }

    const logout = () => {
        // your logout logic
        setIsAuthenticated(false)
        if ( !!localStorage.getItem("token") ){
            localStorage.removeItem("token")
        }
        navigate("/login")
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, user, setUser, login, logout, setAuthStatus }}>
           {props.children}
        </AuthContext.Provider>
    )
}

export {
    AuthContext,
    AuthContextProvider
}