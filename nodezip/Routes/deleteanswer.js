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

    if ( req.body.aid == undefined) {
        console.log("send all details");
        res.status(403).json({ "msg": "all data not send" });
        return;
    }
    if (  req.body.aid == null) {
        console.log("please fill all values");
        res.status(403).json({ "msg": "fill all data" });
        return;
    }


    const username = req.user.userName
    const results = Answer.findOneAndRemove({ _id: req.body.aid , creatorname:username}).then((updatedDoc) => 
       { console.log(updatedDoc);
       
    
        const results = Question.findOneAndUpdate({ _id: updatedDoc.qid}, {$inc: { noa: -1}}).then((updatedDoc) => {
            console.log(updatedDoc);
            res.status(200).json({ "msg": "answer deleted successfully" });
        }).catch(err => console.log(err));
    }).catch(err => console.log("not found"+err))
});
module.exports = router
