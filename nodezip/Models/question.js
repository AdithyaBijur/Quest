var mongoose = require('mongoose');
const Schema = mongoose.Schema({

    question: String,
    title:String,
    tags: Array,
    doc: Date,
    views: Number,
   noa: Number,
    creatorname: String,
    Community: String,
   upvotes:Number,
   downvotes:Number,
   accepted:Array,
   files:Array
})

const Question = mongoose.model('question', Schema)
module.exports = Question;