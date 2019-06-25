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
const History = require('../Models/reps')
const badges = require('../Routes/badges')




router.use(bodyParser())
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))


router.use(verifyToken)

router.post('/',(req,res)=>{
    const username = req.user.userName
   if(req.body.proffesion== undefined || req.body.description== undefined || req.body.location== undefined || req.body.preferedtech== undefined || req.body.faveditor==undefined ){
    console.log("send all details");
    res.status(403).json( {"msg":"all data not send"});
   }
if(req.body.proffesion== null || req.body.description== null || req.body.location== null || req.body.preferedtech==null || req.body.faveditor==null )
{res.status(403).json( {"msg":"fill all data"});}
        
    
  const result=User.findOneAndUpdate({userName:username},{$set: {proffession:req.body.proffesion , description:req.body.description , location:req.body.location , preferedtech:req.body.preferedtech , faveditor:req.body.faveditor}}).then((r)=>{
      console.log(r);
      res.status(200).json({"msg":"info added successfully"})
  })
});

// const port = process.env.PORT || 1080;
// router.listen(port, () => console.log(`Listening on port ${port}...`));
module.exports = router;
