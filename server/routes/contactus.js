const express = require('express');
const route = express.Router();
const { body, validationResult } = require('express-validator');
const Contact = require('../models/contact');
const fetchuserdata = require('../middleware/getUserData');


//Route use for Contact with Us "/api/Contact"
route.post('/', fetchuserdata, [
    body('name', 'Eneter a valid name').isLength({ min: 3 }),
    body('Email', 'Enter a valid email').isEmail(),
    body('Number', 'Enter a valid phone number').isLength({ min: 10 }).isMobilePhone(),
    body('event', 'Eneter a valid Event Name').isLength({ min: 3 }),
    body('msg', 'Eneter Somthing').isLength({ min: 5 }),

], async (req, res) => {

    //if there is error, return errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        //Register User
        const conatctUs = await Contact.create({
            name: req.body.name,
            Email: req.body.Email,
            Number: req.body.Number,
            event: req.body.event,
            eventType: req.body.eventType,
            issue: req.body.issue,
            msg: req.body.msg


        })

        // console.log(conatctUs)
        res.json("done")

    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server Error")
    }
})

module.exports = route