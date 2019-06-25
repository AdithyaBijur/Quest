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
const Community = require('../Models/community')
const Request1 = require('../Models/request')






router.use(bodyParser())
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.use(verifyToken)

router.post('/', (req, res) => {

    if (req.body.rid == undefined  ) {
        console.log("send all details");
        res.status(403).json({ "msg": "all data not send" });
        return;
    }
    if (req.body.rid == null ) {
        console.log("please fill all values");
        res.status(403).json({ "msg": "fill all data" });
        return;
    }


    const username = req.user.userName
    if(req.body.status==1){
        const results = Request1.findOneAndUpdate({ _id: req.body.rid ,sendto:username}, {accepted:true}).then((updatedDoc) => 
    { console.log(updatedDoc+"edrftgyh");
        
       // res.status(400).json({"msg":"Request has been accepted"});

        const results= Community.findOneAndUpdate({_id:updatedDoc.cid,admin:username},{ $push : { members:updatedDoc.sentby },$inc: { nom: 1}}).then((updatedDoc1) => {
            console.log(updatedDoc1);
            const r=User.findOneAndUpdate({userName:username},{$push :{community:updatedDoc1.Name}}).then((a)=>{
                console.log(a);
            }).catch((err)=>console.log(err))
            res.status(200).json({"msg":" Request has been accepted You are now the member of "+updatedDoc1.Name});
        });

 }).catch(err => console.log(err))
    }
    else
    {
        const results = Request1.findByIdAndRemove({ _id: req.body.rid,admin:username }).then((updatedDoc) => 
    { console.log(updatedDoc);
        res.status(200).json({"msg":"Request has been deleted"});
 }).catch(err => console.log(err))

    }
    
})
module.exports = router


