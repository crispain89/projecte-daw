import React, { useState ,useRef,useEffect , createContext,useContext} from 'react';
import './commons/css/estilosGrid.css'
import './App.css';
import mapboxgl from 'mapbox-gl';
/* import 'mapbox-gl/dist/mapbox-gl.css'; */
import {Login} from './components/auth/Login'
import MainPage from './components/mainPage/MainPage'
import {Register} from './components/auth/Register'
import {Button, Modal} from 'react-bootstrap'
import {BrowserRouter as Router, Route, Routes ,Link} from 'react-router-dom'
import ForgotPassword from './components/auth/ForgotPassword';
import EmailVerification from './components/auth/EmailVerification';
import ResetPassword from './components/auth/ResetPassword';
import NotFound from './components/NotFound';
import Layout from './components/layout/default';
import Home from './components/home/Home';
import {AuthContext} from './components/context/AuthContext';
import HomeLayout from './components/layout/home';
import MockComponent from './components/MockComponent';
import Eventos from './components/eventos/Eventos';
import Promociones from './components/promociones/Promociones';
import UserProfile from './components/user/UserProfile';
import Inscripciones from './components/mainPage/Inscripcion'
import Modificaciones from './components/mainPage/Modificaciones'
import EventosC from './components/mainPage/EventosC'
import ModificacionesE from './components/mainPage/ModificacionesE'
import Comercios from './components/mainPage/Comercios'
import Promo from './components/promociones/Promo';

//el token del mapbox
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY

function App() {
  const {isAuthenticated,user} = useContext(AuthContext)
  console.log("ISAUTH",isAuthenticated)
  return (
    <>
        {
          isAuthenticated ?
          <Layout>
            <Routes>
              {
                user.rol === 2 && 
                <>
                <Route path='inscripciones' element={<Inscripciones/> }/>
                <Route path='inscripciones/modificaciones' element={<Modificaciones tabla={'usuarios'} /> }/>
                <Route path='eventos' element={<Eventos/>}/>
                <Route path='/eventos/create' element={<EventosC/>}/>
                <Route path='/eventos/modificaciones' element={<ModificacionesE/>}/>
                <Route path='/comercios' element={<Comercios/>}/>
                </>

              }
              {
                user.rol === 4 && 
                <Route path='/eventos/modificaciones' element={<ModificacionesE/>}/>

              }
              {
                user.rol === 1 && 
                <>
                  <Route path='/user/eventos/:id' element={ <MockComponent/> }/>
                  <Route path='/user/eventos' element={ <Eventos/> }/>
                  <Route path='user/promociones' element={<Promociones/>}/>
                  <Route path='user/promociones/:id' element={<Promo/>}/>
                </>
              }
              <Route path='/' element={ <MainPage/> }/>
              <Route path='/user' element={ <MainPage/> }/>
              <Route path='/user/profile' element={ <UserProfile/> }/>
              
              <Route path="*" element={<NotFound />}></Route>

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
