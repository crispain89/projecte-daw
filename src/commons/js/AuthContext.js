import React, { useState ,useRef,useEffect , createContext,useContext} from 'react';

const AuthContext = createContext(null)


const AuthContextProvider = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser]=useState({id:null, email:null, nombre:null})

    const login = () => {
        // your authentication logic
        setIsAuthenticated(true)
    }

    const logout = () => {
        // your logout logic
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, user, setUser, login, logout }}>
           {props.children}
        </AuthContext.Provider>
    )
}

export {
    AuthContext,
    AuthContextProvider
}