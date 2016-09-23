'use strict';

var express = require('express'),
    routes = require('./app/routes/index.js'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    session = require('express-session'),
    app = express()
    
require('dotenv').load()
require('./app/config/passport')(passport)
    
mongoose.connect(process.env.MONGO_URI)
    
app.use('/public', express.static(process.cwd() + '/public'))
app.use('/controllers', express.static(process.cwd() + '/app/controllers'))
app.use('/common', express.static(process.cwd() + '/common'))

app.use(session({
    secret: 'secretClementine',
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())
    
routes(app, passport)

var server = app.listen(process.env.PORT || 8080, function() {
    console.log('Listening on port ' + server.address().port + '...')
})