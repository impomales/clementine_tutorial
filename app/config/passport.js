'use strict';

var GitHubStrategy = require('passport-github').Strategy
var User = require('../models/users')
var configAuth = require('./auth')

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id)
    })
    
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user)
        })
    })
    
    passport.use(new GitHubStrategy({
        clientID: configAuth.githubAuth.clientID,
        clientSecret: configAuth.githubAuth.clientSecret,
        callbackURL: configAuth.githubAuth.callbackURL
    }))
}