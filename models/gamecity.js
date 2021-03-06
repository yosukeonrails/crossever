var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var GameCitySchema= new mongoose.Schema({
  name:{
    type:String
  },
  gameCityID:{
    type:String,
    require:true,
    unique:true
  },
  gameID:{
    type:String,
    unique:false
  },
  cityID:{
    type:String,
      unique:false
  },
  location:{
      type:Object
  },
  members:{
    type:Array
  },
  gameData:{
    type:Object
  }

})


  var GameCity= module.exports = mongoose.model('GameCity', GameCitySchema);
