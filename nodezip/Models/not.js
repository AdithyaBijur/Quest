var mongoose = require('mongoose');
const Schema = mongoose.Schema({

    msg:String,
    aid:String,
    sendto:String,
    by:String,
    seen:Boolean,
    qid:String
    
})

const Not = mongoose.model('Not', Schema)
module.exports = Not;