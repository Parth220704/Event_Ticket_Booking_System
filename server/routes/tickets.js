const express = require('express');
const route = express.Router();
const Tickets = require('../models/ticket');
const fetchuserdata = require('../middleware/getUserData');
const Event = require('../models/event');
const { validationResult } = require('express-validator');
const User = require('../models/User');

//ROUTE:1 tickets details "/api/events/:eventID/ticket"

//for generatesite Numbers
function generateSiteNumber(quantity) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const siteNumbers = [];
    for (let i = 0; i < quantity; i++) {
        const randomAlphabet = alphabet[Math.floor(Math.random() * alphabet.length)];
        const randomDigits = Math.floor(1 + Math.random() * 900); // Generates a random 3-digit number
        siteNumbers.push(`${randomAlphabet}${randomDigits}`);
    }
    return siteNumbers;
}

route.post('/:eventId/book', fetchuserdata, async (req, res) => {

    //if there is error, return errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    try {
        const { eventId } = req.params;
        const userId = req.user.id; // Assuming userId is available in req.user

        console.log(userId);

        // Validate request body
        if (!userId) {
            return res.status(400).json({ error: 'User not authenticated' });
        }

        const siteNumber = generateSiteNumber(req.body.quantity);

        
        // Create ticket document
        const newTicket = await Tickets.create({
            user: userId,
            event: eventId,
            title: req.body.title,
            artist: req.body.artist,
            quantity: req.body.quantity,
            totalAmount: req.body.totalAmount,
            eventDate: req.body.eventDate,
            eventTime: req.body.eventTime,
            location: req.body.location,
            city: req.body.city,
            siteNumber: siteNumber
        });

        

        // Update user tickets
        await User.findByIdAndUpdate(userId, {
            $push: {
                tickets: {
                    event: eventId,
                    quantity: req.body.quantity,
                    totalAmount: newTicket.totalAmount,
                    title: req.body.title,
                    artist: req.body.artist,
                    eventDate: req.body.eventDate,
                    eventTime: req.body.eventTime,
                    city: req.body.city,
                    location: req.body.location,
                    siteNumber: siteNumber
                }
            }
        });

        return res.status(201).json(newTicket);
    } catch (error) {
        console.error('Error booking tickets:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = route