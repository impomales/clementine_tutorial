'use strict';

var Clicks = require('../models/clicks.js')

function ClickHandler() {
    this.getClicks = function(req, res) {
        var clickProjection = {'_id': false}
        
        Clicks
            .findOne({}, clickProjection)
            .exec(function(err, result) {
                if (err) throw new Error('Query error in collection "clicks".')
            
                if (result) res.json(result)
                else {
                    var newDoc = new Clicks({'clicks': 0})
                    newDoc.save(function(err, doc) {
                       if (err) throw new Error('Error in insertion of initial click.')
                       
                       res.json(doc)
                    })
                }
            }
        )
    }
    
    this.addClick = function(req, res) {
        Clicks
            .findOneAndUpdate({}, { $inc: {'clicks': 1} })
            .exec(function(err, result) {
                if (err) throw new Error('Error updating click count to database.')
                
                res.json(result)
            }
        )
    }
    
    this.resetClicks = function(req, res) {
        Clicks
            .findOneAndUpdate({}, {'clicks': 0})
            .exec(function(err, result) {
                if (err) throw new Error('Error in resetting click count')
                
                res.json(result)
            }
        )
    }
}

module.exports = ClickHandler