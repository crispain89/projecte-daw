import React, { useContext, useEffect } from 'react'
import { FaFacebook, FaInstagram, FaMapMarkedAlt, FaMailBulk } from 'react-icons/fa';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AuthService from '../../../servicios/auth.service';
import '../../css/estilosGrid.css'
import { AuthContext } from '../AuthContext';


export default function Sidebar({ accio }) {
    const {user,logout} = useContext(AuthContext)
    console.log("DATOS",user)
    const logoutSession = async () => {
        try{
            let res = await AuthService.signout()
            console.log("SIGNOUT",res)
            logout()
        }
        catch(e){
            console.log(e)
        }
    }
    return (
        <aside >
            <div className='avatar'>
                <img src="https://oneill.law.georgetown.edu/wp-content/uploads/2021/06/generic-profile.png"></img>
            </div>
            {user.nombre && 
                <h3 className='usuario__nombre'>
                    {user.nombre}
                </h3>
            }
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <a onClick={logoutSession}>Logout</a>
                </li>
                <li>
                    <Link to="/profile">Profile</Link>
                </li>
                <li>
                    <Link to="/messages">Messages</Link>
                </li>
            </ul>
        </aside>
    )
}
