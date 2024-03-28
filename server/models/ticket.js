const mongoose = require('mongoose');
const { Schema } = mongoose;
const Events = require('./event')


const Ticketschema = new Schema({
   usser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
   },

   event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Events'
   },

   title: {
      type: String,
      ref: 'Events.title'
   },

   artist: {
      type: String,
      ref: 'Events.artist'
   },

   quantity: {
      type: Number,
      default: 1
   },

   totalAmount: {
      type: Number,
      default: 0
   },

   eventDate: {
      type: Date,
      ref: 'Events.eventDate'
   },

   eventTime: {
      type: String,
      ref: 'Events.eventTime'
   },

   location: {
      type: String,
      ref: 'Events.location'
   },

   city: {
      type: String,
      ref: 'Events.city'
   },

   siteNumber: [
      {
         type: String,
         required: true
      }
   ]
});


module.exports = mongoose.model('Tickets', Ticketschema)