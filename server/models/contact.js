const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./User')

const Contact = new Schema({

    "name":{
        type: String,
        ref: 'User.name'
    },
    "Email":{
        type: String,
        ref: 'User.email'
    },
    "Number":{
        type: Number,
        ref: 'User.phoneNumber'
    },
    "event":{
        type: String,
        require: true,
    },
    "eventType":{
        type: String,
        require: true,
    },
    "issue":{
        type: String,
        require: true,
    },
    "msg":{
        type: String,
        require: true
    }

}) 

module.exports = mongoose.model('Contact', Contact)