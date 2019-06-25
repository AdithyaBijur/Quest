const express =require("express");
const mongoose= require("mongoose");
var bodyParser = require('body-parser')
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const us=require("underscore");
var validator = require("email-validator");
const User = require("../Models/User")
const verifyToken = require('../Helpers/verifytoken')

const router=express.Router();

router.use(bodyParser())
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))


router.use(verifyToken)
module.exports = function(req,res,next){

  const r=User.findOne({userName:req}).then((resq)=>{
     console.log(resq.rep);

     if(resq.rep>10){
       const bd=User.findOneAndUpdate({userName:req},{badge:"gold"}).then((bdr)=>{
          console.log(bdr);
       })
     }
     if(resq.rep<=10){
      const bd=User.findOneAndUpdate({userName:req},{badge:"silver"}).then((bdr)=>{
         console.log(bdr);
      })
      
    }
 });
  //next()
};
