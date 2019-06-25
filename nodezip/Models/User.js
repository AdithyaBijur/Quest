var mongoose = require('mongoose');
const Schema = mongoose.Schema({
    email: String,
    password: String,
    userName: String,
    firstname: String,
    lastname: String,
    interest: Array,
    aos: Array,
    lastsession:Date,
    rep:Number,
    profile:String,
    upvotedans:Array,
    downvotedans:Array,
    upvotedques:Array,
    downvotedques:Array,
    badge:String,
    community:Array,
   shared:Array,
    proffession:String
    ,description:String,
    location:String,
    preferedtech:String,
    faveditor:String
  
})

const User = mongoose.model('User', Schema)
module.exports = User;