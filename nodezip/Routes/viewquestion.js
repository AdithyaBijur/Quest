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

router.use(verifyToken)



router.post('/', (req, res) => {
    const username = req.user.userName

    if (req.body.mod == null || req.body.mod == undefined)
        res.status(400).json({ "msg": "Send all data" });
    const tu = User.findOne({ userName: username }).then((tp => {
        console.log(tp.interest)
        console.log("1234567890-***********************************")
        console.log(tp.aos)
        if (req.body.mod == "latest") {

            const re1 = Question.find({ tags: { $in: tp.interest }, Community: "Open" }).sort({ doc: -1 }).then((updatedDoc1) => {
                console.log(updatedDoc1)
                if (updatedDoc1.length == 0) {
                    res.status(202).json({ "msg": "no questions" })
                }
                else
                    res.status(200).send(updatedDoc1);
            }).catch(err => console.log(err))
        }
        if (req.body.mod == "mostviewed") {

            const re1 = Question.find({ Community: "Open" }).sort({ views: -1 }).then((updatedDoc1) => {
                console.log(updatedDoc1)
                if (updatedDoc1.length == 0) {
                    res.status(202).json({ "msg": "no questions" })
                }
                else
                    res.status(200).send(updatedDoc1);
            }).catch(err => console.log(err))
        }
        if (req.body.mod == "unanswered") {

            const re1 = Question.find({ accepted: [], tags: { $in: tp.aos }, Community: "Open" }).sort({ views: -1 }).then((updatedDoc1) => {
                console.log(updatedDoc1)
                if (updatedDoc1.length == 0) {
                    res.status(202).json({ "msg": "no questions" })
                }
                else
                    res.status(200).send(updatedDoc1);
            }).catch(err => console.log(err))
        }



    }))

});
module.exports = router
