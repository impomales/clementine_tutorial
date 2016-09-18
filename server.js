'use strict'

var express = require('express'),
    routes = require('./app/routes/index.js'),
    mongo = require('mongodb').MongoClient,
    app = express()
    
mongo.connect('mongodb://' + process.env.IP + ':27017/clementinedb', function(err, db) {
    if (err) throw new Error('Database failed to connect!')
    else console.log('MongoDB successfully connected on port 27017.')
    
    app.use('/public', express.static(process.cwd() + '/public'))
    app.use('/controllers', express.static(process.cwd() + '/app/controllers'))
        
    routes(app, db)
    
    var server = app.listen(process.env.PORT || 8080, function() {
        console.log('Listening on port ' + server.address().port)
    })
})