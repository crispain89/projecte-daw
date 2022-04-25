'use strict'

const express = require('express')
var router = express.Router()

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

// CRUD products
const VisitCtrl = require('../controllers/visit.js')
router.apiResource('visits', VisitCtrl)

module.exports = router