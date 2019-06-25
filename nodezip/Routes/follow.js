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

    if (req.body.cid == undefined  ) {
        console.log("send all details");
        res.status(403).json({ "msg": "all data not send" });
        return;
    }
    if (req.body.cid == null ) {
        console.log("please fill all values");
        res.status(403).json({ "msg": "fill all data" });
        return;
    }


    const username = req.user.userName
   
    const sts=Community.findOne({_id:req.body.cid})
    .then(
    
    resu =>{console.log(resu); 
              
    if(resu.open==true){
       
       
       const results= Community.findByIdAndUpdate({_id:resu._id},{ $push : { members:username },$inc: { nom: 1}}).then((updatedDoc) => {
            console.log(updatedDoc.Name);
           const r=User.findOneAndUpdate({userName:username},{$push :{community:updatedDoc.Name}}).then((a)=>{
               console.log(a);
           }).catch((err)=>console.log(err))
            res.status(200).json({"msg":"You are now the member of"+resu.Name});
        });

    }
    else{
        const r = new Request1({

            cid: req.body.cid,
            sentby: username,
            doc: Date.now(),
            sendto: resu.admin,
            accepted:false,
            name:resu.Name
                 
             })
             r.save()
             .then(
             
             resu =>{console.log(resu); res.status(200).json({"msg":"request sent successfully"});
                        }
             )
             .catch(err => console.log(err))

    }
    
    
    
    
    
    
    }
    )
    .catch(err => console.log(err))
})
module.exports = router


