import React, { useState ,useRef,useEffect , createContext,useContext} from 'react';
import './commons/css/estilosGrid.css'
import './App.css';
import mapboxgl from 'mapbox-gl';
/* import 'mapbox-gl/dist/mapbox-gl.css'; */
import {Login} from './commons/js/Login'
import MainPage from './commons/js/MainPage'
import {Register} from './commons/js/Register'
import {Button, Modal} from 'react-bootstrap'
import {BrowserRouter as Router, Route, Routes ,Link} from 'react-router-dom'
import ForgotPassword from './commons/js/ForgotPassword';
import EmailVerification from './commons/js/EmailVerification';
import ResetPassword from './commons/js/ResetPassword';
import NotFound from './commons/js/NotFound';
import Footer from './commons/js/layout/Footer';
import Layout from './commons/js/layout/default';
import Home from './commons/js/Home';
import {AuthContext} from './commons/js/AuthContext';
import PrivateRoute from './commons/js/routes/PrivateRoute';
import HomeLayout from './commons/js/layout/home';
import MockComponent from './commons/js/MockComponent';
//el token del mapbox
mapboxgl.accessToken = "pk.eyJ1IjoiY2lzcGFpbjg5IiwiYSI6ImNsMmo4ZmxtbjBjem0zY3MzNG41em80MDkifQ.n3GnK0soJwz763xqSPVdoQ";

function App() {
  const {isAuthenticated} = useContext(AuthContext)
  console.log("ISAUTH",isAuthenticated)
  return (
    <>
        {
          isAuthenticated ?
          <Layout>
            <Routes>
              <Route path='/user' element={ <MainPage/> }/>
              <Route path='/user/:id/eventos' element={ <MockComponent/> }/>
            </Routes>
          </Layout> 
          :
          <HomeLayout>
            <Routes>
              <Route path='/' element={ <Home/> }/>
              <Route path='/home' element={<Home/>}/> 
              <Route path='/register' element={<Register/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/forgot' element={<ForgotPassword/>}/>
              <Route path='/forgot/email-verification' element={<EmailVerification/>}/>
              <Route path='/forgot/email-verification/:email' element={<EmailVerification/>}/>
              <Route path='/forgot/reset/:id/:token' element={<ResetPassword/>}/>
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </HomeLayout>
        } 
    </>
  )
}

export default App;
