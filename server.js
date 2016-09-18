'use strict'

var express = require('express')
var app = express()

app.get('/', function(req, res) {
    res.sendFile(process.cwd() + '/index.html')
})

var server = app.listen(process.env.PORT || 8080, function() {
    console.log('Listending on port ' + server.address().port)
})