var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var GroupSchema= new mongoose.Schema({
  name:{
    type:String,
    require:true,
    unique:true
  },
  gameID:{
    type:String,
    require:true,
    unique:true
  },
  gameData:{
    type:Object
  },
  members:{
    type:Array
  }

})


var Group= module.exports = mongoose.model('Group', GroupSchema);
