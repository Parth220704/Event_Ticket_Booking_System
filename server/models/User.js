const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    interests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event' // ReferenFce to the Event model
        }
    ],
    tickets: [
        {
            event: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Event' // Reference to the Event model
            },
            quantity: {
                type: Number,
                default: 1
            },
            totalAmount: {
                type: Number,
                default: 0
            },
            title: {
                type: String,
               
            },
            artist: {
                type: String,
                
            },
            eventDate: {
                type: Date,
                
            },
            eventTime: {
                type: String,
                
            },
            location: {
                type: String,
                
            },
            city: {
                type: String,
                
            },
            siteNumber: [
                {
                    type: String,
                    required: true
                }
            ]
        }
    ]
});

module.exports = mongoose.model("user", UserSchema);