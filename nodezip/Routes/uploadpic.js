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
const path = require('path')
const User = require("../Models/User")
const router = express.Router();
const verifyToken = require('../Helpers/verifytoken')


router.use(verifyToken)


const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    const username = req.user.userName
    cb(null, username + ".jpg");
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  }

});

router.post("/", upload.single('file'), (req, res, next) => {
  console.log('**************************************', req.file)
  var a = "http://localhost:5000/" + req.file.path
  const resu = User.findOneAndUpdate({ userName: req.user.userName }, { profile: a })
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