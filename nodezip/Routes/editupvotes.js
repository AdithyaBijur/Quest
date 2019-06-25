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


router.post('/', (req, res) => {

    if (req.body.aid == undefined ) {
        console.log("send all details");
        res.status(403).json({ "msg": "all data not send" });
        return;
    }
    if ( req.body.aid == null ) {
        console.log("please fill all values");
        res.status(403).json({ "msg": "fill all data" });
        return;
    }
    

    const username = req.user.userName
    const r=User.findOne({userName:username}).then((resq)=>{
         console.log(resq.upvotedans);
         if (!resq.upvotedans.includes(req.body.aid) && !resq.downvotedans.includes(req.body.aid))
         {console.log("1")
         const results = Answer.findOneAndUpdate({ _id: req.body.aid }, {$inc: { upvotes: 1}}).then((updatedDoc) => 
         {// console.log(updatedDoc.askedby);
          const r=User.findOneAndUpdate({userName:username},{ $push: { upvotedans: req.body.aid } }).then((abc)=>{
             // console.log(resq);
          });
  
  
  
          const result1 = User.findOneAndUpdate({ userName:updatedDoc.creatorname }, {$inc: { rep: 10}}).then((updated1Doc) => 
          {// console.log(updated1Doc);
              badges(username)            
              const history = new History({
      
                  msg:username+" has upvoted your answer and 10 reps are added to your account",
                  qid:updatedDoc.qid,
                  aid:req.body.aid,
                  reps:10,
                  date:Date.now(),
                  username:updatedDoc.creatorname,
                  doneby:username
                  
              
             
                  
              })
              history.save().then((resu)=>{
                 console.log(resu);
              })
             
  
  
  
          //updated doc is same as old answerr new answer has been changed in db
       }).catch(err => console.log(err))
       const ur=Answer.findOne({_id:req.body.aid}).then((xyz)=>{
        res.status(200).send(xyz)
    })
      
       // res.send(updatedDoc);//updated doc is same as old answerr new answer has been changed in db
      }).catch(err => console.log(err))
        
        
        
        }
     if (!resq.upvotedans.includes(req.body.aid) && resq.downvotedans.includes(req.body.aid)) {
         console.log("2")
         const results = Answer.findOneAndUpdate({ _id: req.body.aid }, {$inc: { upvotes: 1}}).then((updatedDoc) => 
         {// console.log(updatedDoc.askedby);
          const r=User.findOneAndUpdate({userName:username},{ $push: { upvotedans: req.body.aid } }).then((abc)=>{
             // console.log(resq);
          });
  
  
  
          const result1 = User.findOneAndUpdate({ userName:updatedDoc.creatorname }, {$inc: { rep: 10}}).then((updated1Doc) => 
          {// console.log(updated1Doc);
              badges(username)            
              const history = new History({
      
                  msg:username+" has upvoted your answer and 10 reps are added to your account",
                  qid:updatedDoc.qid,
                  aid:req.body.aid,
                  reps:10,
                  date:Date.now(),
                  username:updatedDoc.creatorname,
                  doneby:username
                  
              
             
                  
              })
              history.save().then((resu)=>{
                 console.log(resu);
              })
              const a = Answer.findOneAndUpdate({ _id: req.body.aid }, {$inc: { downvotes: -1}}).then((aupdatedDoc) => 
        {  const b = User.findOneAndUpdate({ userName:aupdatedDoc.askedby }, {$inc: { rep: 7}}).then((bupdated1Doc) => 
        { console.log(bupdated1Doc);

            badges(username) 
            const history = new History({
    
                msg:username+" has removed downvote from your answer and 7 reps are added  to your account",
                qid:aupdatedDoc.qid,
                aid:req.body.aid,
                reps:7,
                date:Date.now(),
                username:aupdatedDoc.creatorname,
                doneby:username
                
            
           
                
            })
            history.save().then((resu)=>{
                console.log(resu);
            })
        //updated doc is same as old answerr new answer has been changed in db
     }).catch(err => console.log(err))
     const t=User.findOneAndUpdate({userName:username},{ $pull: { downvotedans: req.body.aid } }).then((rt)=>{
        console.log(rt);
    });
         console.log(aupdatedDoc);//updated doc is same as old answerr new answer has been changed in db
     }).catch(err => console.log(err))
  
  
  
          //updated doc is same as old answerr new answer has been changed in db
       }).catch(err => console.log(err))
         
       const ur=Answer.findOne({_id:req.body.aid}).then((xyz)=>{
        res.status(200).send(xyz)
    })
    
    //   res.send(updatedDoc);//updated doc is same as old answerr new answer has been changed in db
      }).catch(err => console.log(err))
        
     }
     if (resq.upvotedans.includes(req.body.aid) && !resq.downvotedans.includes(req.body.aid))
        { console.log("3")
    
        const results = Answer.findOneAndUpdate({ _id: req.body.aid }, {$inc: { upvotes: -1}}).then((updatedDoc) => 
        { console.log(updatedDoc.askedby);
            const r=User.findOneAndUpdate({userName:username},{ $pull: { upvotedans: req.body.aid } }).then((abc)=>{
                //console.log(abc);
            });

            const result1 = User.findOneAndUpdate({ userName:updatedDoc.creatorname }, {$inc: { rep: -10}}).then((updated1Doc) => 
            { console.log(updated1Doc);
                badges(username) 
                const history = new History({
    
                    msg:username+" has removed the upvote to your answer and 10 reps are removed from your account",
                    qid:updatedDoc.qid,
                    aid:req.body.aid,
                    reps:-10,
                    date:Date.now(),
                    username:updatedDoc.creatorname,
                    doneby:username
                    
                
               
                    
                })
                history.save().then((resu)=>{
                    console.log(resu);
                })



            //updated doc is same as old answerr new answer has been changed in db
         }).catch(err => console.log(err))
         const ur=Answer.findOne({_id:req.body.aid}).then((xyz)=>{
             res.status(200).send(xyz)
         })
         //res.send(updatedDoc);//updated doc is same as old answerr new answer has been changed in db
     }).catch(err => console.log(err))
    
    
    }

     });

/*
    if(req.body.flag==1){
    const results = Answer.findOneAndUpdate({ _id: req.body.aid }, {$inc: { upvotes: 1}}).then((updatedDoc) => 
       {// console.log(updatedDoc.askedby);
        const r=User.findOneAndUpdate({userName:username},{ $push: { upvotedans: req.body.aid } }).then((resq)=>{
           // console.log(resq);
        });



        const result1 = User.findOneAndUpdate({ userName:updatedDoc.creatorname }, {$inc: { rep: 10}}).then((updated1Doc) => 
        {// console.log(updated1Doc);
            badges(username)            
            const history = new History({
    
                msg:username+" has upvoted your answer and 10 reps are added to your account",
                qid:updatedDoc.qid,
                aid:req.body.aid,
                reps:10,
                date:Date.now(),
                username:updatedDoc.creatorname,
                doneby:username
                
            
           
                
            })
            history.save().then((resu)=>{
               console.log(resu);
            })
           



        //updated doc is same as old answerr new answer has been changed in db
     }).catch(err => console.log(err))
        res.send(updatedDoc);//updated doc is same as old answerr new answer has been changed in db
    }).catch(err => console.log(err))}
    else{
        const results = Answer.findOneAndUpdate({ _id: req.body.aid }, {$inc: { upvotes: -1}}).then((updatedDoc) => 
        { console.log(updatedDoc.askedby);
            const r=User.findOneAndUpdate({userName:username},{ $pull: { upvotedans: req.body.aid } }).then((resq)=>{
                console.log(resq);
            });

            const result1 = User.findOneAndUpdate({ userName:updatedDoc.creatorname }, {$inc: { rep: -10}}).then((updated1Doc) => 
            { console.log(updated1Doc);
                badges(username) 
                const history = new History({
    
                    msg:username+" has removed the upvote to your answer and 10 reps are removed from your account",
                    qid:updatedDoc.qid,
                    aid:req.body.aid,
                    reps:-10,
                    date:Date.now(),
                    username:updatedDoc.creatorname,
                    doneby:username
                    
                
               
                    
                })
                history.save().then((resu)=>{
                    console.log(resu);
                })



            //updated doc is same as old answerr new answer has been changed in db
         }).catch(err => console.log(err))
         res.send(updatedDoc);//updated doc is same as old answerr new answer has been changed in db
     }).catch(err => console.log(err))

    }*/
});
module.exports = router
