'use strict';

var express = require('express'),
    routes = require('./app/routes/index.js'),
    mongoose = require('mongoose'),
    app = express()
    
mongoose.connect('mongodb://' + process.env.IP + ':27017/clementinedb')
    
app.use('/public', express.static(process.cwd() + '/public'))
app.use('/controllers', express.static(process.cwd() + '/app/controllers'))
    
routes(app)

var server = app.listen(process.env.PORT || 8080, function() {
    console.log('Listening on port ' + server.address().port)
})