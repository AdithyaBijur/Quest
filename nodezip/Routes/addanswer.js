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
const not = require('../Models/not')




router.use(bodyParser())
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))


//router.use(verifyToken)

router.post('/', (req, res) => {

    if (req.body.qid == undefined || req.body.answer == undefined) {
        console.log("send all details");
        res.status(403).json({ "msg": "all data not send" });
        return;
    }
    if (req.body.qid == null || req.body.answer == null) {
        console.log("please fill all values");
        res.status(403).json({ "msg": "fill all data" });
        return;
    }
    var askby
    const results = Question.findOne({ _id: req.body.qid }).then((updated1Doc) => {
        console.log(updated1Doc.creatorname);
        askby = updated1Doc.creatorname;
        const username = "nilesh"
        const answer = new Answer({


            creatorname: username,
            qid: req.body.qid,
            question: updated1Doc.question,
            answer: req.body.answer,
            doc: Date.now(),
            upvotes: 0,
            downvotes: 0,
            verified: false,
            accepted: false,
            askedby: askby



        })
        answer.save()
            .then(

                resu => {
                    console.log(resu);

                    const results = Question.findOneAndUpdate({ _id: req.body.qid }, { $inc: { noa: 1 } }).then((updatedDoc) => {
                        // console.log(updatedDoc);
                        const Not = new not({

                            msg: username + " has answered your question",
                            sendto: askby,
                            by: username,
                            qid: req.body.qid,
                            seen: false



                        })
                        Not.save().then((a => {
                            console.log(a)
                            res.status(200).send(resu)
                        }))

                    }).catch(err => console.log(err));
                }
            )
            .catch(err => console.log(err))

    }).catch(err => console.log(err));

})
module.exports = router


