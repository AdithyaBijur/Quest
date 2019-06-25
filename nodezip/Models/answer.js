var mongoose = require('mongoose');
const Schema = mongoose.Schema({

    qid: String,
    answer: String,
    doc: Date,
    upvotes:Number,
    downvotes:Number,
   verified:Boolean,
    creatorname: String,
    accepted : Boolean,
    askedby:String,
    question:String
    
   
})

const Answer = mongoose.model('answer', Schema)
module.exports = Answer;