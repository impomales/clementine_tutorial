'use strict';

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var Click = new Schema(
    {clicks: Number},
    {versionKey: false} // mongoose adds this property by default.
)
    
module.exports = mongoose.model('Click', Click)