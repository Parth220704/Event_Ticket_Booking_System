const express = require('express');
const route = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuserdata = require('../middleware/getUserData');
const Tickets = require('../models/ticket');
// const Contact = require('../models/contact');

const jwtSecret = "WhatTheFuck";


route.post('/registration', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('phoneNumber', 'Enter a valid phone number').isLength({ min: 10 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        // Check if the user with this email or phone number already exists
        let user = await User.findOne({ $or: [{ email: req.body.email }, { phoneNumber: req.body.phoneNumber }] });
        if (user) {
            return res.status(400).json({ success: false, error: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Register the user
        user = await User.create({
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            password: hashedPassword,
        });

        const payload = {
            user: {
                id: user.id
            }
        };

        // Generate JWT token
        const authtoken = jwt.sign(payload, jwtSecret);

        res.json({ success: true, authtoken });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, error: "Server Error" });
    }
});


//User login "/api/auth/login".
route.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    let success = false;

    //if there is error, return errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false
            return res.status(400).json({ error: "please enter valid email or password" })
        }

        let comparepass = await bcrypt.compare(password, user.password);
        if (!comparepass) {
            success = false
            return res.status(400).json({ success, error: "please enter valid email or password" })
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, jwtSecret);
        success = true;
        res.json({ success, authtoken });
    } catch (error) {

        console.error(error.message);
        res.status(500).json("Server Error")
    }

})

// get user details "/api/auth/profile"

route.get('/profile', fetchuserdata, async (req, res) => {

    //if there is error, return errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server Error")
    }
})


module.exports = route