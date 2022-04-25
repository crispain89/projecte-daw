'use strict'

// App config
const config = {
    'server': require('./config/server'),
    'database': require('./config/database')
}

// App framework
const express = require('express')
const app = express()

// App logger
const pino = require('pino-http')()
app.use(pino)

// App session
const session = require('express-session')
app.use(
    session({
        // It holds the secret key for session
        secret: 'keyboard_cat',
        // Forces the session to be saved
        // back to the session store
        resave: true,
        // Forces a session that is "uninitialized"
        // to be saved to the store
        saveUninitialized: false,
        // Cookies config
        cookie: { }
    })
)

// App template engine
const nunjucks = require('nunjucks')
nunjucks.configure('views', {
    autoescape: true,
    express: app
})

// App database
let db = config.database
if (!db.uri) {
    db.uri = `${db.driver}://`
        + (db.username ? `${db.username}:${db.password}@` : '')
        + `${db.host}:${db.port}/${db.database}`
}
console.log(`Connecting to ${db.uri}`)

const mongoose = require('mongoose')
mongoose.connect(db.uri, (err , res) => {
    if (err){
        console.log(`DB connection ERROR: ${err}`)
    } else {
        console.log(`DB connection established`)
    }
})

// App routes - Favicon
const favicon = require('serve-favicon')
const path = require('path')
app.use(favicon(path.join(__dirname, 'favicon.ico')))

// App routes - Web
const web = require('./routes/web')
app.use(web)

// App routes - API
const api = require('./routes/api')
app.use('/api', api)
app.use('/api', express.urlencoded({extended: false}))
app.use('/api', express.json())

// App routes - 404 not found 
const ErrorCtrl = require('./controllers/error')
app.use(ErrorCtrl.error404)

// Deploy app
const HOST = config.server.host
const PORT = config.server.port
app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)

module.exports = app