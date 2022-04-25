'use strict'

const mongoose = require('mongoose');

const schema = mongoose.Schema({
    'name': String,
    'ip': String,
    'counter': Number,
    'category': {
        'type': String, 
        'enum': ['human', 'machine']
    }
});

module.exports = mongoose.model('Visit', schema);