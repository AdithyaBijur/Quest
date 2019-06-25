var mongoose = require('mongoose');
const Schema = mongoose.Schema({

    msg:String,
    qid:String,
    aid:String,
    reps:Number,
    date:Date,
    username:String,
    doneby:String
   
})

const History = mongoose.model('history', Schema)
module.exports = History;