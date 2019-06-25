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

const badges = require('../Routes/badges')


router.use(bodyParser())
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))


router.use(verifyToken)

router.post('/', (req, res) => {

    if (req.body.aid == undefined) {
        console.log("send all details");
        res.status(403).json({ "msg": "all data not send" });
        return;
    }
    if ( req.body.aid == null) {
        console.log("please fill all values");
        res.status(403).json({ "msg": "fill all data" });
        return;
    }


    const username = req.user.userName
    const results = Answer.findOneAndUpdate({ _id: req.body.aid,askedby:username }, {accepted:true}).then((updatedDoc) => 
       { //console.log(update);
        const r=Question.findOneAndUpdate({_id:updatedDoc.qid},{accepted:req.body.aid}).then((re=>{
            console.log(re);
        }))

        const result1 = User.findOneAndUpdate({ userName:updatedDoc.creatorname }, {$inc: { rep: 15}}).then((updated1Doc) => 
        { //console.log(updated1Doc);
            badges(updatedDoc.creatorname) 
        //updated doc is same as old answerr new answer has been changed in db
     }).catch(err => console.log(err))
        res.status(200).send(updatedDoc);//updated doc is same as old answerr new answer has been changed in db
    }).catch(err => console.log(err))
});
module.exports = router
