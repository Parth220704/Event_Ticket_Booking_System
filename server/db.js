const mongoose = require('mongoose');

const  URL = 'mongodb+srv://Parth:parth2207@eventtickesbooking.k1sllpo.mongodb.net/EventBooking'

const connectToMongo = () =>{
    mongoose.connect(URL)
}

module.exports = connectToMongo;