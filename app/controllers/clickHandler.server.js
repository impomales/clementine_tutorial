'use strict';

var Users = require('../models/users.js')

function ClickHandler() {
    this.getClicks = function(req, res) {
        
        Users
            .findOne({'github.id': req.user.github.id}, {'_id': false})
            .exec(function(err, result) {
                if (err) throw new Error('Query error in collection "clicks".')
            
                res.json(result.nbrClicks)
            }
        )
    }
    
    this.addClick = function(req, res) {
        Users
            .findOneAndUpdate({'github.id': req.user.github.id}, { $inc: {'nbrClicks.clicks': 1} })
            .exec(function(err, result) {
                if (err) throw new Error('Error updating click count to database.')
                
                res.json(result.nbrClicks)
            }
        )
    }
    
    this.resetClicks = function(req, res) {
        Users
            .findOneAndUpdate({'github.id': req.user.github.id}, {'nbrClicks.clicks': 0})
            .exec(function(err, result) {
                if (err) throw new Error('Error in resetting click count')
                
                res.json(result.nbrClicks)
            }
        )
    }
}

module.exports = ClickHandler