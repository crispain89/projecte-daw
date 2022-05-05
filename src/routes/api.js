'use strict'

const express = require('express')
var router = express.Router()
//Import controllers
const UsuarioCtrl = require('../controllers/usuario.js')
const RolCtrl = require('../controllers/rol.js')
const AuthCtrl = require('../controllers/auth.js')
const EventCtrl = require('../controllers/evento.js')
const ComerCtrl = require('../controllers/comercio.js')
const PromoComerCtrl = require('../controllers/promo_comercio.js')
const PromoEventCtrl= require('../controllers/promo_evento.js')
const EventComerCtrl=require('../controllers/evento_comercio.js')


// Emulate Laravel apiResource method
router.apiResource = function(resource,controller) {
    let uriRUD, uriLC;
    let url = resource.split(".")

    if(url.length === 1) {
        uriLC  = `/${url[0]}`
        uriRUD = `/${url[0]}/:id`
    }
    if(url.length === 2) {
        uriLC =`/${url[0]}/:id/${url[1]}`
        uriRUD =`/${url[0]}/:id/${url[1]}/:nid`
    }
    const ErrorCtrl = require('../controllers/error')
    router.get(uriLC, controller.index || ErrorCtrl.error404)
    router.post(uriLC, controller.store || ErrorCtrl.error404)
    router.get(uriRUD, controller.show || ErrorCtrl.error404)
    router.put(uriRUD, controller.update || ErrorCtrl.error404)
    router.delete(uriRUD, controller.destroy || ErrorCtrl.error404)    
}

//Auth
//router.post('auth/login',AuthCtrl.signin)
router.post('auth/register',AuthCtrl.signup)

// CRUD products
router.apiResource('usuarios', UsuarioCtrl)
router.apiResource('roles', RolCtrl)
router.apiResource('eventos',EventCtrl)
router.apiResource('comercios', ComerCtrl)
router.apiResource('comercios.promociones', PromoComerCtrl)
router.apiResource('eventos.promociones', PromoEventCtrl)
router.apiResource('comercios.eventos',EventComerCtrl)
router.get('comercios/:id/eventos', ComerCtrl.promos)




module.exports = router