'use strict'

const express = require('express')
var router = express.Router()
//Import controllers
const UsuarioCtrl = require('../controllers/usuario.js')
const RolCtrl = require('../controllers/rol.js')
const AuthCtrl = require('../controllers/auth.js')

// Emulate Laravel apiResource method
router.apiResource = function(resource,controller) {
    let uriLC  = `/${resource}`
    let uriRUD = `/${resource}/:id`
    const ErrorCtrl = require('../controllers/error')
    router.get(uriLC, controller.index || ErrorCtrl.error404)
    router.post(uriLC, controller.store || ErrorCtrl.error404)
    router.get(uriRUD, controller.show || ErrorCtrl.error404)
    router.put(uriRUD, controller.update || ErrorCtrl.error404)
    router.delete(uriRUD, controller.destroy || ErrorCtrl.error404)    
}

//Auth
router.post('auth/login',AuthCtrl.signin)
router.post('auth/register',AuthCtrl.signup)

// CRUD products
router.apiResource('usuarios', UsuarioCtrl)
router.apiResource('roles', RolCtrl)

module.exports = router