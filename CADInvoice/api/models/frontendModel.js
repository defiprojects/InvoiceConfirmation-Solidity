'use strict'

var Mongoose = require('mongoose')
var Schema = Mongoose.Schema

var ApiSchema = new Schema({
    name: {
        type: String,
        required: 'Please enter a name'
        },
    created_date: {
        type: Date,
        default: Date.now
        },
    status: {
        type: [{
            type: String,
            enum: ['pending', 'active']
        }],
        default: ['pending']
    },
})

module.exports = Mongoose.Model('FrontEnd', ApiSchema)

