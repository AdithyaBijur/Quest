var mongoose = require('mongoose');
const Schema = mongoose.Schema({

   tag:String,
   desc:String
    
   
})

const Tags = mongoose.model('tags', Schema)
module.exports = Tags;