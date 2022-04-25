'use strict'

function error404(req, res){
    req.log.debug('Error 404')
    res.status(404)
    if (req.accepts('html')) {
        // respond with html page
        res.render('errors/404.html', { 
            'url': req.url 
        })
    } else if (req.accepts('json')) {
        // respond with json
        res.send({
            'message': 'URL not found',
            'url': req.url
        })
    } else {
        // default to plain-text
        res.type('txt').send('Not found')
    }
}

module.exports = {
    error404
}