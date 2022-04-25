'use strict'

require('dotenv').config()

module.exports = {
    // Option 1
    'uri': process.env.DB_URI,
    // Option 2
    'driver': process.env.DB_DRIVER || 'mongodb',
    'host': process.env.DB_HOST || 'localhost',
    'port': process.env.DB_PORT || '27017',
    'username': process.env.DB_USERNAME || '',
    'password': process.env.DB_PASSWORD || '',
    'database': process.env.DB_DATABASE || 'myapp'
}