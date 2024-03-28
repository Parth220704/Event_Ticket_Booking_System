const jwt = require('jsonwebtoken');
const jwtSecret = "WhatTheFuck";

const fetchuserdata = (req,res,next) =>{

    //get the user from jwt token
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: "please authenticate your self"})
    }
    try {
        const data = jwt.verify(token,jwtSecret);
        req.user = data.user;
        next();
        
    } catch (error) {
        res.status(401).send({error: "please authenticate your self"})
    }
}

module.exports = fetchuserdata;