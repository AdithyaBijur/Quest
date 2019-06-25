const express = require('express');
const verifyToken = require('../Helpers/verifytoken')
const jwt = require('jsonwebtoken');
const config = require('../config');
const bodyParser = require('body-parser')
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const User = require("../Models/User")
const router = express.Router()
const Answer = require('../Models/answer')
const Question = require('../Models/question')




router.use(bodyParser())
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))




router.post('/', (req, res) => {

    if ( req.body.username == undefined) {
        console.log("send all details");
        res.status(403).json({ "msg": "all data not send" });
        return;
    }
    if (  req.body.username == null) {
        console.log("please fill all values");
        res.status(403).json({ "msg": "fill all data" });
        return;
    }


    
    const results = Answer.find({ creatorname: req.body.username }).then((updatedDoc) => 
       {// console.log(updatedDoc)
        console.log(updatedDoc);
        res.status(200).send(updatedDoc)
        
    }).catch(err => console.log("not found"+err))
});
module.exports = router
