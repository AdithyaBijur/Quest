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





router.use(bodyParser())
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))


router.use(verifyToken)

router.post('/', (req, res) => {

    if (req.body.name == undefined || req.body.open == undefined||req.body.location == undefined || req.body.description==undefined ) {
        console.log("send all details");
        res.status(403).json({ "msg": "all data not send" });
        return;
    }
    if (req.body.name == null || req.body.open == null || req.body.location== null || req.body.description==null) {
        console.log("please fill all values");
        res.status(403).json({ "msg": "fill all data" });
        return;
    }


    const username = req.user.userName
    
    const ur=User.findOne({userName:username}).then((xyz)=>{
        console.log(xyz.rep);
        if(xyz.rep>=180){
         const   c=Community.findOne({Name:req.body.name}).then((abc)=>{
             if(abc==null){
                const community = new Community({

        
        
                    Name: req.body.name,
                    createdby: username,
                    doc: Date.now(),
                    members: username,
                    nom: 1,
                    open:req.body.open,
                    admin: username ,
                    description:req.body.description,
   location:req.body.location,
                        
                     
                    
                         
                     })
                     community.save()
                         .then(
                         
                         resu =>{console.log(resu); res.status(200).json({"msg":"Group created successfully"});
                                    }
                         )
                         .catch(err => console.log(err))
            
                    }
                else{
                    res.status(400).json({"msg":"group already exist"})
                }  })}
                    else{
                        res.status(200).json({"msg":"you are not capable of creating a group"})
                    }


        
       
    
    })
})
module.exports = router


