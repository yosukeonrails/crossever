var mongoose= require('mongoose');
var bcrypt = require('bcrypts');

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
  members:{
    type:Object
  }

})


var Group= module.exports = mongoose.model('Group', GroupSchema);
