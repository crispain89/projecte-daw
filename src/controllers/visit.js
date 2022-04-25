'use strict'

const Visit = require('../models/Visit')

function index(req, res){
    req.log.debug('GET /api/visits')
    req.log.debug(req.query)

    Visit.find(req.query, (err, list) => {
        if (err) {
            res.status(500).send({
                'message': `ERROR: ${err}`
            })
        } else if (!list) {
            res.status(404).send({
                'message': `Not found`
            })
        } else {
            res.status(200).send(list)
        }
    })
}

function store(req, res){
    req.log.debug('POST /api/visits')
    req.log.debug(req.body)
    
    let model = new Visit()
    model.name = req.body.name
    model.ip = request.socket.remoteAddress
    model.counter = req.body.counter
    model.category = req.body.category
    
    model.save((err, stored) => {
        if (err) {
            return res.status(500).send({
                'message': `ERROR: ${err}`
            })
        } else {
            res.status(200).send(stored)
        }
    })
}

function show(req, res){
    req.log.debug('GET /api/visits/:id')
    req.log.debug(req.params)

    Visit.findById(req.params.id, (err, found) => {
        if (err) {
            res.status(500).send({
                'message': `ERROR: ${err}`
            })
        } else if (!found) {
            res.status(404).send({
                'message': `Not found`
            })
        } else {
            res.status(200).send(found)
        }
    })
}

function update(req, res){
    req.log.debug('PUT /api/visits/:id')
    req.log.debug(req.params)
    req.log.debug(req.body)

    model.findByIdAndUpdate(req.params.id, req.body, (err, updated) => {
        if (err) {
            res.status(500).send({
                'message': `ERROR: ${err}`
            })
        } else if (!updated) {
            res.status(404).send({
                'message': `Not found`
            })
        } else {
            res.status(200).send(updated)
        }
    })
}

function destroy(req, res){
    req.log.debug('DELETE /api/visits/:id')
    req.log.debug(req.params)

    Visit.findById(req.params.id, (err, found) => {
        if (err) {
            res.status(500).send({
                'message': `ERROR: ${err}`
            })
        } else if (!found) {
            res.status(404).send({
                'message': `Not found`
            })
        } else {
            model.remove( err => {
                if (err) {
                    res.status(500).send({
                        'message': `ERROR: ${err}`
                    })
                } else {
                    res.status(200).send({
                        'message': 'Resource sucessfully deleted'
                    })
                }
            })
        }
    })
}

module.exports = {
    index,
    store,
    show,
    update,
    destroy
}