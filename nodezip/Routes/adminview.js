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

    const re1 = Question.find().sort({ doc: -1 }).then((updatedDoc1) => {
        console.log(updatedDoc1)
        if (updatedDoc1.length == 0) {
            res.status(202).json({ "msg": "no questions" })
        }
        else
            res.status(200).send(updatedDoc1);
    }).catch(err => console.log(err))


});
module.exports = router
