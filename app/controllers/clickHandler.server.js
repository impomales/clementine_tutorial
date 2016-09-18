'use strict'

function clickHandler(db) {
    var clicks = db.collection('clicks')
    
    this.getClicks = function(req, res) {
        var clickProjection = {'_id': false}
        
        clicks.findOne({}, clickProjection, function(err, result) {
            if (err) throw new Error('Query error in collection "clicks".')
            
            if (result) res.json(result)
            else {
                clicks.insert({'clicks': 0}, function(err) {
                    if (err) throw new Error('Error in insertion of initial click.')
                    
                    clicks.findOne({}, clickProjection, function(err, doc) {
                        if (err) throw new Error('Query error after inserting initial click')
                        
                        res.json(doc)
                    })
                })
            }
        })
    }
    
    this.addClick = function(req, res) {
        clicks.findAndModify(
            {},
            {'_id': 1},
            { $inc: {'clicks': 1} },
            function(err, result) {
                if (err) throw new Error('Error updating click count to database.')
                
                res.json(result)
            }
        )
    }
    
    this.resetClicks = function(req, res) {
        clicks.update({}, {'clicks': 0}, function(err, result) {
            if (err) throw new Error('Error in resetting click count')
            res.json(result)
        })
    }
}

module.exports = clickHandler