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

    if ( req.body.qid == undefined) {
        console.log("send all details");
        res.status(403).json({ "msg": "all data not send" });
        return;
    }
    if (  req.body.qid == null) {
        console.log("please fill all values");
        res.status(403).json({ "msg": "fill all data" });
        return;
    }


   
    const results = Question.findOneAndRemove({ _id: req.body.qid }).then((updatedDoc) => 
       { console.log(updatedDoc);
        if(updatedDoc==null)
        res.status(404).json({"msg":"no question found"})
        else{
        
            console.log(updatedDoc.qid)
        const results = Answer.deleteMany({ qid: updatedDoc._id}).then((updatedDoc) => {
            console.log(updatedDoc);
            res.status(200).json({ "msg": "question deleted successfully" })
        }).catch(err => console.log(err));
        } }).catch(err => console.log("not found"+err))

});
module.exports = router
