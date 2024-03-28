const mongoose = require('mongoose');
const { Schema } = mongoose;

const Eventschema = new Schema({
    title: {
        type: String,
        require: true
    },
    image: {
        type: String
    },
    description: {
        type: String,
        require: true
    },
    artist: {
        type: String,
    },
    type: {
        type: String,
        require: true
    },
    eventDate: {
        type: Date,
        require: true
    },
    eventTime: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    likes: { 
        type: Number, 
        default: 0
    },
    price: {
        type: Number,
        require: true
    },
});

module.exports = mongoose.model('Events', Eventschema)