import React, { useState ,useRef,useEffect , createContext,useContext} from 'react';
import './commons/css/estilosGrid.css'
import './App.css';
import mapboxgl from 'mapbox-gl';
/* import 'mapbox-gl/dist/mapbox-gl.css'; */
import {Login} from './commons/js/Login'
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
import {AuthContextProvider} from './commons/js/AuthContext';
import PrivateRoute from './commons/js/routes/PrivateRoute';
import HomeLayout from './commons/js/layout/home';
import MainPage from './commons/js/MainPage';

mapboxgl.accessToken = "pk.eyJ1IjoiY2lzcGFpbjg5IiwiYSI6ImNsMmo4ZmxtbjBjem0zY3MzNG41em80MDkifQ.n3GnK0soJwz763xqSPVdoQ";

function App() {

  return (
    <Router>
      <AuthContextProvider>
          <Routes>
            <Route path='/' element={
              <HomeLayout>
                <PrivateRoute>
                  <Home/>
                </PrivateRoute>
              </HomeLayout>
            }/>
            <Route path='/home' element={<Home/>}/> 
            <Route path='/user' element={
              <Layout>
                <PrivateRoute>
                  <MainPage/>
                </PrivateRoute>
              </Layout>
            }/>
            {/* Ruta del Login */}
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/forgot' element={<ForgotPassword/>}/>
            <Route path='/forgot/email-verification' element={<EmailVerification/>}/>
            <Route path='/forgot/email-verification/:email' element={<EmailVerification/>}/>
            <Route path='/forgot/reset/:id/:token' element={<ResetPassword/>}/>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
      </AuthContextProvider>

    </Router>
  )
}

export default App;
