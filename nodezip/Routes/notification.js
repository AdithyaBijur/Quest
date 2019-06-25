const express = require('express');
const verifyToken = require('../Helpers/verifytoken')
const jwt = require('jsonwebtoken');
const config = require('../config');
const bodyParser = require('body-parser')
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const User = require("../Models/User")
const router = express.Router()
const Not = require('../Models/not')
const Notification = require('../Models/notification')
const History = require('../Models/reps')
const Request1 = require('../Models/request')
// const Not = require('../Models/not')




router.use(bodyParser())
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))


router.use(verifyToken)

router.post('/', (req, res) => {


//const usern="adithya"
    const usern = req.user.userName
  if(req.body.mod=="shared"){
    const n=Notification.find({sendto:{$in:usern},seen:false}).sort({doc:-1}).then((a=>{
        console.log(a);
        if(a.length!=0)
        res.status(200).send(a)
        else
        res.status(200).json({"msg":"no  notification"})  
    })).catch((err=>res.send(err)))

  }
  if(req.body.mod=="reps"){
    const r=History.find({username:usern}).sort({doc:-1}).then((re=>{
        // console.log(re.msg)
        if(re.length!=0)
            res.status(200).send(re)
            else
        res.status(200).json({"msg":"no  notification"})  
        })).catch((err=>res.send(err)))

  }
  if(req.body.mod=="request"){
      
    const request=Request1.find({sendto:usern,accepted:false}).sort({doc:-1}).then((t=>{
        console.log(t)   
        if(t.length!=0)   
        res.status(200).send(t);
        else
        res.status(200).json({"msg":"no  notification"})  
       })).catch((err=>res.send(err)))
  }

      if(req.body.mod=="answer"){
        const rs=Not.find({sendto:usern,seen:false}).sort({doc:-1}).then((t=>{
            console.log(t)
            if(t.length!=0)   
            res.status(200).send(t);
            else
            res.status(200).json({"msg":"no  notification"})
               
           })).catch((err=>res.send(err)))
      }
       

        
    
});
module.exports = router
