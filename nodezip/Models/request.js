var mongoose = require('mongoose');
const Schema = mongoose.Schema({

   cid: String,
   sentby: String,
   doc: Date,
   sendto: String,
   accepted:Boolean,
   name:String   
   
})

const Request1 = mongoose.model('request', Schema)
module.exports = Request1;