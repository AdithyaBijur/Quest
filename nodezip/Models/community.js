var mongoose = require('mongoose');
const Schema = mongoose.Schema({

   Name: String,
   createdby: String,
   doc: Date,
   members: Array,
   nom: Number,
   open:Boolean,
   admin: String ,
   description:String,
   location:String,
   profile:String
   
})

const Community = mongoose.model('community', Schema)
module.exports = Community;