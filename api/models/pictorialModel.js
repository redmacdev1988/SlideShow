'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PictorialSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        dropDups: true
    },

    fileName : String,
    description: String,
    Created_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Pictorial', PictorialSchema);
