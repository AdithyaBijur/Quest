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
    if ( req.body.name == undefined||req.body.mod == undefined) {
        console.log("send all details");
        res.status(403).json({ "msg": "all data not send" });
        return;
    }
    if (  req.body.name == null||req.body.mod == null) {
        console.log("please fill all values");
        res.status(403).json({ "msg": "fill all data" });
        return;
    }


    const username = req.user.userName
        if(req.body.mod=="answered"){
        const re1=Question.find({ Community:req.body.name ,noa:{$gt: 0},accepted:{$ne: null}}).then((updatedDoc1) =>{ 
         if(updatedDoc1.length!=0)   
        res.send(updatedDoc1);
        else
        res.status(404).json({"msg":"no questions posted yet"})
        }).catch(err => console.log(err))
    }
    if(req.body.mod=="unanswered"){
        const re1=Question.find({ Community:req.body.name ,noa:0,accepted:null}).then((updatedDoc1) =>{ 
            if(updatedDoc1.length!=0)   
           res.status(200).send(updatedDoc1);
           else
           res.status(404).json({"msg":"no questions posted yet"})
           }).catch(err => console.log(err))
    }
    
});
module.exports = router
