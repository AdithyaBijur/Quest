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

const Notification = require("../Models/notification")



router.use(bodyParser())
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))


router.use(verifyToken)

router.post('/', (req, res) => {
    const username = req.user.userName
    if ( req.body.qid == undefined||req.body.name==undefined) {
        console.log("send all details");
        res.status(403).json({ "msg": "all data not send" });
        return;
    }
    if (  req.body.qid == null ||req.body.name==null) {
        console.log("please fill all values");
        res.status(403).json({ "msg": "fill all data" });
        return;
    }

const notification = new Notification({

    //link:"localhost:5000/api/question/"+req.body.qid,
    sendto:req.body.name,
    sentby:username,
    doc: Date.now(),
    qid:req.body.qid,
    seen:false,
    msg:username+" has shared a question with you"

})
notification.save().then((ab=>{
    const sq=User.updateMany({userName:{$in:req.body.name}},{$push:{shared:req.body.qid}}).then((qs={
    }))
    res.status(200).send(ab)
}))

});
module.exports = router
