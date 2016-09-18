'use strict'

var express = require('express'),
    routes = require('./app/routes/index.js'),
    app = express()
    
routes(app)

var server = app.listen(process.env.PORT || 8080, function() {
    console.log('Listending on port ' + server.address().port)
})