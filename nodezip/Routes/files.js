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
const Question = require("../Models/question")
const router = express.Router();
const verifyToken = require('../Helpers/verifytoken')
const crypto = require('crypto');

router.use(verifyToken)


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
   
    cb(null, './uploads/Files');
  },
  filename: function(req, file, cb) {
    const username = req.user.userName
   // console.log(file)
    //console.log(req)
    crypto.randomBytes(16, (err, buf) => {
      if (err) {
        return reject(err);
      }
      const f = buf.toString('hex')+path.extname(file.originalname);
     // console.log(f)
    cb(null,f);
  })}
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
 
});

router.post("/", upload.any(), (req, res, next) => {
    console.log(req.files)
    var fi=[]
    req.files.forEach(element => {
       
    var a="http://localhost:5000/"+element.path
    fi.push({"filename":element.originalname,
"location":a
} )
    });
    
    const resu=Question.findOneAndUpdate({_id:req.body.qid},{$push:{files:fi}})
      .then(result => {
        console.log(result);
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