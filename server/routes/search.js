const express = require('express');
const route = express.Router();
const Event = require('../models/event');
const { body, validationResult } = require('express-validator');

//ROUTE:10 Search functionality "/search"

route.get('/', async (req, res) => {

    //if there is error, return errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const { query } = req.query;

        // Check the query parameter is provided or not
        if (!query) {
            return res.status(400).json({ error: 'Search Something' });
        }

        // Use a regular expression for case-sensitive
        const search = new RegExp(query, 'i');

        // Find events that match search query
        const searchResults = await Event.find({

            //$or use for search multiple fields
            $or: [
                { title: { $regex: search } },
                { artist: { $regex: search } }
            ],
        });

        res.json(searchResults);
        // console.log(searchResults);

    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server Error")
    }

})

module.exports = route