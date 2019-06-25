var mongoose = require('mongoose');
const Schema = mongoose.Schema({
doc:Date,
msg:String,
link:String,
sendto:Array,
sentby:String,
qid:String,
seen:Boolean
})

const Notification = mongoose.model('notification', Schema)
module.exports = Notification;