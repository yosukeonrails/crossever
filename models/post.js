var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var PostSchema= new mongoose.Schema({
  //
  // postID:{
  //   type:String,
  //   require:true,
  //   unique:true
  // },

  groupID:{
    type:String,
    require:true
  },
  user:{
    type:Object
  },
  keywords:{type:Array},
  groupType:{ type: String, enum: ['city', 'group'] },
  title:{type:String},
  message:{type:String},
  time : { type : Date, default: Date.now },
  likedBy:{type:Array},
  popularity:{type:Number, default:0},
  topic:{type:String},
  comments:{type:Number}

})


  var Post= module.exports = mongoose.model('Post', PostSchema);
