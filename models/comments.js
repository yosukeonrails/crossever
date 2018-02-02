var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var CommentsSchema= new mongoose.Schema({

  postID:{
    type:String,
    require:true
  },
  user:{
    type:Object
  },
  //tag:{type:Array},
  //groupType:{ type: String, enum: ['city', 'group'] },
  //title:{type:String},
  message:{type:String},
  time : { type : Date, default: Date.now },
  likes:{type:Number},
  popularity:{type:Number},
  //topic:{type:String}
  reply:{
    type:Object
  }
})


  var Comments= module.exports = mongoose.model('Comment', CommentsSchema);
