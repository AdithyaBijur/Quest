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
    console.log(username)
    const us=User.findOne({userName:username}).then((result=>{
        console.log(result);
        
        const re1=Answer.find({ _id:{$in :result.upvotedans} }).then((updatedDoc1) =>{ 
            
            res.status(200).send(updatedDoc1);
            }).catch(err => console.log(err))
        
    }))    
    
});
module.exports = router
