const express = require('express');
const route = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuserdata = require('../middleware/getUserData');
const Event = require('../models/event');
const User = require('../models/User');

//ROUTE:1 Add an new event "/api/events/addevent"
route.post('/addevent', fetchuserdata, [
    body('title', 'Please enter valid event title').notEmpty(),
    body('image', 'Please enter valid image url').notEmpty(),
    body('description', 'Please enter Description of an event').notEmpty(),
    body('artist', 'Please enter artist name').notEmpty(),
    body('type', 'Please enter event type').notEmpty(),
    body('eventDate', 'Please enter event Date').notEmpty(),
    body('eventTime', 'Please enter event Time').notEmpty(),
    body('location', 'Please enter event location').notEmpty(),
    body('city', 'Please enter city').notEmpty(),
    body('likes'),

], async (req, res) => {

    //if there is error, return errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, image, description, artist, type, eventDate, eventTime, location, city, likes, price } = req.body;

    try {

        //check if Event Already exist or not
        let eventexist = await Event.findOne({ title });
        if (eventexist) {
            return res.status(400).json({ error: "Event already exist" })
        }

        //add new event
        const newevent = await Event.create({
            title,
            image,
            description,
            artist,
            type,
            eventDate,
            eventTime,
            location,
            city,
            likes,
            price
        });

        res.json(newevent);
        // console.log(newevent);

    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server Error")
    }
})

//ROUTE:2 Get All cities "/api/events/cities"
route.get('/cities', async (req, res) => {
    //if there is error, return errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        //get all cities
        const cities = await Event.find().distinct('city');
        res.json(cities);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server Error")
    }
})

//ROUTE:3 Get All events based on city "/api/events/fetchevents/:cityName"

route.get('/fetchevents/:cityName', async (req, res) => {

    //if there is error, return errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { cityName } = req.params;

        //Fetch All Events based on Cities
        const fetchevent = await Event.find({ city: cityName });

        if (fetchevent.length === 0) {
            return res.json("nope! Nothing! Naa!  There is no Events");
        }

        res.json(fetchevent);
        // console.log(fetchevent);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server Error")
    }
})

//ROUTE:4 Get All Free events "/api/events/free/:cityName"
route.get('/free/:cityName', async (req, res) => {

    //if there is error, return errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { cityName } = req.params;

        // Fetch all free events based on cities
        const freeEvents = await Event.find({ city: cityName, $or: [{ price: 0 }, { price: { $exists: false } }] });

        if (freeEvents.length === 0) {
            return res.json("nope! Nothing! Naa!  There is no free Events");
        }

        res.json(freeEvents);
        // console.log(freeEvents);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server Error")
    }
})

//ROUTE:5 Get All sports events "/api/events/sports/:cityName"
route.get('/sports/:cityName', async (req, res) => {

    //if there is error, return errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { cityName } = req.params;

        //Fetch all Sports events based on city
        const sportsEvents = await Event.find({ city: cityName, type: 'Sports' });

        if (sportsEvents.length === 0) {
            return res.json("nope! Nothing! Naa!  There is no Sports Event");
        }
        res.json(sportsEvents);

    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server Error")
    }
})

//ROUTE:6 Get All Music events "/api/events/music/:cityName"
route.get('/music/:cityName', async (req, res) => {

    //if there is error, return errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { cityName } = req.params;

        //Fetch all Music events based on city
        const musicEvents = await Event.find({ city: cityName, type: 'Music' });

        if (musicEvents.length === 0) {
            return res.json("nope! Nothing! Naa!  There is no Music Event");
        }
        res.json(musicEvents);

    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server Error")
    }
})

//ROUTE:7 Get All Comedy events "/api/events/Comedy/:cityName"
route.get('/comedy/:cityName', async (req, res) => {

    //if there is error, return errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { cityName } = req.params;

        //Fetch all Comedy events based on city
        const comedyEvents = await Event.find({ city: cityName, type: 'Comedy' });

        if (comedyEvents.length === 0) {
            return res.json("nope! Nothing! Naa!  There is no Music Event");
        }
        res.json(comedyEvents);

    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server Error")
    }
})

//ROUTE:8 Get All Popular events "/api/events/popular/:cityName"
route.get('/popular/:cityName', async (req, res) => {

    //if there is error, return errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { cityName } = req.params;

        //Fetch all popular events based on city
        const popularEvents = await Event.find({ city: cityName }).sort({ likes: -1 });

        if (popularEvents.length === 0) {
            return res.json("nope! Nothing! Naa!  There is no Event");
        }
        res.json(popularEvents);

    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server Error")
    }
})

//ROUTE:9 Get event by ID "/api/events/:eventid"

route.get('/:eventid', async (req, res) => {

    //if there is error, return errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const eventId = req.params.eventid;

        // Find the event by its ID
        const eventDetails = await Event.findById(eventId);

        // Check if the event exists
        if (!eventDetails) {
            return res.status(404).json({ error: 'Event not found' });
        }

        res.json(eventDetails);

    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server Error")
    }

})

//ROUTE:10 update event likes "/api/events/:eventid/like"

route.put('/:id/likes', fetchuserdata, async (req, res) => {
    const eventId = req.params.id;
    const action = req.body.action; // 'like' or 'dislike'

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        const userId = req.user.id;

        // Find user by its id
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the user has already liked/disliked the event
        const alreadyLiked = user.interests.includes(eventId);

        // Update interest of event
        if (action === 'like') {
            // If the user hasn't already liked the event, like it
            if (!alreadyLiked) {
                event.likes++;
                user.interests.push(eventId);
                await Promise.all([event.save(), user.save()]);
            }
        } else if (action === 'dislike') {
            // If the user has liked the event, allow them to dislike it
            if (alreadyLiked) {
                event.likes--;
                user.interests = user.interests.filter(interest => interest.toString() !== eventId);
                await Promise.all([event.save(), user.save()]);
            }
        } else {
            return res.status(400).json({ error: 'Invalid action' });
        }

        // Send success response with updated likes count
        res.status(200).json({ message: 'Interest updated successfully', likes: event.likes });
    } catch (error) {
        console.error('Error updating interest:', error);
        // Send error response
        res.status(500).json({ error: 'Internal server error' });
    }
});



module.exports = route