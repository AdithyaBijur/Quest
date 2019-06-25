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
    if (req.body.qid == undefined ) {
        console.log("send all details");
        res.status(403).json({ "msg": "all data not send" });
        return;
    }
    if ( req.body.qid == null ) {
        console.log("please fill all values");
        res.status(403).json({ "msg": "fill all data" });
        return;
    }
    

    const username = req.user.userName

    const r=User.findOne({userName:username}).then((resq)=>{
        console.log(resq.upvotedques);
    
        if(!resq.upvotedques.includes(req.body.qid) && !resq.downvotedques.includes(req.body.qid)){
            console.log("1")

            
    const results = Question.findOneAndUpdate({ _id: req.body.qid }, {$inc: { upvotes: 1}}).then((updatedDoc) => 
    { 
     //console.log(updatedDoc.creatorname);
     const result1 = User.findOneAndUpdate({ userName:updatedDoc.creatorname }, {$inc: { rep: 5}}).then((updated1Doc) => 
     { //console.log(updated1Doc);
         badges(updatedDoc.creatorname) 
         const history = new History({
 
             msg:username+" has upvoted your question and 5 reps are added to your account",
             aid:updatedDoc.aid,
             qid:req.body.qid,
             reps:5,
             date:Date.now(),
             username:updatedDoc.creatorname,
             doneby:username
             
         
        
             
         })
         history.save().then((resu)=>{
         //    console.log(resu);
         })



     //updated doc is same as old answerr new answer has been changed in db
  }).catch(err => console.log(err))
  const r=User.findOneAndUpdate({userName:username},{ $push: { upvotedques: req.body.qid } }).then((abc)=>{
     //console.log(resq);
 });

 const ur=Question.findOne({_id:req.body.qid}).then((xyz)=>{
    res.status(200).send(xyz)
})
    // res.send(updatedDoc);//updated doc is same as old answerr new answer has been changed in db
 }).catch(err => console.log(err))

        }
        if(resq.upvotedques.includes(req.body.qid) && !resq.downvotedques.includes(req.body.qid)){
            console.log("2")
            const results = Question.findOneAndUpdate({ _id: req.body.qid }, {$inc: { upvotes: -1}}).then((updatedDoc) => 
        {  //console.log(updatedDoc.creatorname);
            const result1 = User.findOneAndUpdate({ userName:updatedDoc.creatorname }, {$inc: { rep: -5}}).then((updated1Doc) => 
            {// console.log(updated1Doc);

                badges(updatedDoc.creatorname) 

                const history = new History({
    
                    msg:username+" has upvoted your question has removed the upvote to your answer and 10 reps are removed from your account 5 reps are added to your account",
                    aid:updatedDoc.aid,
                    qid:req.body.qid,
                    reps:-5,
                    date:Date.now(),
                    username:updatedDoc.creatorname,
                    doneby:username
                    
                
               
                    
                })
                history.save().then((resu)=>{
                 //   console.log("history")
               //     console.log(resu);
                })
            //updated doc is same as old answerr new answer has been changed in db
         }).catch(err => console.log(err))
         const r=User.findOneAndUpdate({userName:username},{ $pull: { upvotedques: req.body.qid } }).then((abc)=>{
           // console.log(resq);
        });
        
        
        const ur=Question.findOne({_id:req.body.qid}).then((xyz)=>{
            res.status(200).send(xyz)
        })
        // res.send(updatedDoc);//updated doc is same as old answerr new answer has been changed in db
     }).catch(err => console.log(err))

        }
        if(!resq.upvotedques.includes(req.body.qid) && resq.downvotedques.includes(req.body.qid)){
            console.log("3")

                
    const results = Question.findOneAndUpdate({ _id: req.body.qid }, {$inc: { upvotes: 1}}).then((updatedDoc) => 
    { 
     //console.log(updatedDoc.creatorname);
     const result1 = User.findOneAndUpdate({ userName:updatedDoc.creatorname }, {$inc: { rep: 5}}).then((updated1Doc) => 
     { //console.log(updated1Doc);
         badges(updatedDoc.creatorname) 
         const history = new History({
 
             msg:username+" has upvoted your question and 5 reps are added to your account",
             aid:updatedDoc.aid,
             qid:req.body.qid,
             reps:5,
             date:Date.now(),
             username:updatedDoc.creatorname,
             doneby:username
             
         
        
             
         })
         history.save().then((resu)=>{
         //    console.log(resu);
         })



     //updated doc is same as old answerr new answer has been changed in db
  }).catch(err => console.log(err))
  const r=User.findOneAndUpdate({userName:username},{ $push: { upvotedques: req.body.qid } }).then((abc)=>{
     //console.log(resq);
 });


 const dresults = Question.findOneAndUpdate({ _id: req.body.qid }, {$inc: { downvotes: -1}}).then((dupdatedDoc) => 
 {console.log(dupdatedDoc);
     console.log(dupdatedDoc.creatorname);
     const result1 = User.findOneAndUpdate({ userName:dupdatedDoc.creatorname }, {$inc: { rep: 3}}).then((dupdated1Doc) => 
     { console.log(dupdated1Doc);

         badges(dupdatedDoc.creatorname) 
         
     const history = new History({

         msg:username+" has removed downvote from your question and 3 reps are added to your account",
         aid:dupdatedDoc.aid,
         qid:req.body.qid,
         reps:3,
         date:Date.now(),
         username:dupdatedDoc.creatorname,
         doneby:username
         
     
    
         
     })
     history.save().then((dresu)=>{
         console.log(dresu);
     })



         const dr=User.findOneAndUpdate({userName:username},{ $pull: { downvotedques: req.body.qid } }).then((dresq)=>{
             console.log(dresq);
         });
         const ur=Question.findOne({_id:req.body.qid}).then((xyz)=>{
            res.send(xyz)
        })
    // res.send(updatedDoc);//updated doc is same as old answerr new answer has been changed in db
 })}).catch(err => console.log(err))




     res.status(200).send(updatedDoc);//updated doc is same as old answerr new answer has been changed in db
 }).catch(err => console.log(err))

    
        }
        
    
    
    
    
    
    });
/*
    if (req.body.qid == undefined || req.body.flag==undefined) {
        console.log("send all details");
        res.status(403).json({ "msg": "all data not send" });
        return;
    }
    if ( req.body.qid == null || req.body.flag== null) {
        console.log("please fill all values");
        res.status(403).json({ "msg": "fill all data" });
        return;
    }


    const username = req.user.userName
    if(req.body.flag==1){
    const results = Question.findOneAndUpdate({ _id: req.body.qid }, {$inc: { upvotes: 1}}).then((updatedDoc) => 
       { 
        console.log(updatedDoc.creatorname);
        const result1 = User.findOneAndUpdate({ userName:updatedDoc.creatorname }, {$inc: { rep: 5}}).then((updated1Doc) => 
        { console.log(updated1Doc);
            badges(updatedDoc.creatorname) 
            const history = new History({
    
                msg:username+" has upvoted your question and 5 reps are added to your account",
                aid:updatedDoc.aid,
                qid:req.body.qid,
                reps:5,
                date:Date.now(),
                username:updatedDoc.creatorname,
                doneby:username
                
            
           
                
            })
            history.save().then((resu)=>{
                console.log(resu);
            })



        //updated doc is same as old answerr new answer has been changed in db
     }).catch(err => console.log(err))
     const r=User.findOneAndUpdate({userName:username},{ $push: { upvotedques: req.body.qid } }).then((resq)=>{
        console.log(resq);
    });

        res.send(updatedDoc);//updated doc is same as old answerr new answer has been changed in db
    }).catch(err => console.log(err))}
    else{
        const results = Question.findOneAndUpdate({ _id: req.body.qid }, {$inc: { upvotes: -1}}).then((updatedDoc) => 
        {  console.log(updatedDoc.creatorname);
            const result1 = User.findOneAndUpdate({ userName:updatedDoc.creatorname }, {$inc: { rep: -5}}).then((updated1Doc) => 
            { console.log(updated1Doc);

                badges(updatedDoc.creatorname) 

                const history = new History({
    
                    msg:username+" has upvoted your question has removed the upvote to your answer and 10 reps are removed from your account 5 reps are added to your account",
                    aid:updatedDoc.aid,
                    qid:req.body.qid,
                    reps:-5,
                    date:Date.now(),
                    username:updatedDoc.creatorname,
                    doneby:username
                    
                
               
                    
                })
                history.save().then((resu)=>{
                    console.log("history")
                    console.log(resu);
                })
            //updated doc is same as old answerr new answer has been changed in db
         }).catch(err => console.log(err))
         const r=User.findOneAndUpdate({userName:username},{ $pull: { upvotedques: req.body.qid } }).then((resq)=>{
            console.log(resq);
        });
         res.send(updatedDoc);//updated doc is same as old answerr new answer has been changed in db
     }).catch(err => console.log(err))

    }*/
});
module.exports = router
