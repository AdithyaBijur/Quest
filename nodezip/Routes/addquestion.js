const express = require('express');
const verifyToken = require('../Helpers/verifytoken')
const jwt = require('jsonwebtoken');
const config = require('../config');
const bodyParser = require('body-parser')
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const User = require("../Models/User")
const router = express.Router()
const Question = require('../Models/question')




router.use(bodyParser())
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))


router.use(verifyToken)

router.post('/', (req, res) => {

    if (req.body.question == undefined || req.body.comunity == undefined || req.body.title == undefined) {
        console.log("send all details");
        res.status(403).json({ "msg": "all data not send" });
        return;
    }
    if (req.body.question == null || req.body.comunity == null || req.body.title == null) {
        console.log("please fill all values");
        res.status(403).json({ "msg": "fill all data" });
        return;
    }


    const username = req.user.userName
    const question = new Question({


        creatorname: username,
        question: req.body.question,
        title: req.body.title,
        tags: req.body.tags,
        doc: Date.now(),
        views: 0,
        noa: 0,

        Community: req.body.comunity,
        upvotes: 0,
        downvotes: 0

    })
    question.save()
        .then(

            resu => { console.log(resu); res.status(200).send(resu); }
        )
        .catch(err => console.log(err))
})
module.exports = router


