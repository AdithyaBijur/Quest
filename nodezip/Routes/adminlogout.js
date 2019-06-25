const express =require("express");
const mongoose= require("mongoose");
var bodyParser = require('body-parser')
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const us=require("underscore");
var validator = require("email-validator");
const User = require("../Models/User")

const router=express.Router();
router.use(bodyParser())

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json())
router.post('/',(req,res)=>{
   
  const result=User.findOneAndUpdate({userName:"admin"},{lastsession:Date.now()}).then(re=>{
      console.log(re);
      res.statusCode(200).send(re)
  })
});

// const port = process.env.PORT || 1080;
// router.listen(port, () => console.log(`Listening on port ${port}...`));
module.exports = router;
