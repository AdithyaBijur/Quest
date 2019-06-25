const express = require("express");
//const router = express.Router();
//const mongoose = require("mongoose");
const multer = require('multer');
//const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config');
const bodyParser = require('body-parser')
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const path=require('path')
const Community = require("../Models/community")
const router = express.Router();
const verifyToken = require('../Helpers/verifytoken')


router.use(verifyToken)


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
   
    cb(null, './uploads/community/');
  },
  filename: function(req, file, cb) {
      console.log(file)
    const username = file.originalname
    cb(null,username);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
 
});

router.post("/", upload.single('profile'), (req, res, next) => {
   // console.log(req)
    var a="http://localhost:5000/"+req.file.path
    const username = req.user.userName
    const resu=Community.findOneAndUpdate({Name:req.body.Name,admin:username},{profile:a})
      .then(result => {
       // console.log(result);
        res.status(201).json({
          message: "Created product successfully"
         
          
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });


  module.exports = router