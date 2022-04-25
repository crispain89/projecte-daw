'use strict'

function index(req, res){
    // Read JSON file
    let json = require('../package.json')
    // Count site visits
    if (req.session.counter) {
        // Increment the number of views
        req.session.counter++
    } else {
        // Initialize views counter
        req.session.counter = 1
    }
    req.log.debug(req.session.counter + ' visits')
    // Collect template data
    let data = {
        'title': 'Visits counter',
        'packages': json.dependencies,
        'counter': req.session.counter
    }
    // Render view template
    res.render('index.html', data)
}

module.exports = {
    index
}