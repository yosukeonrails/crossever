var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var CityForumSchema= new mongoose.Schema({

  gameCityID:{
    type:String,
    require:true,
    unique:true
  },

  posts:{
    type:Array
  }

})


  var CityForum= module.exports = mongoose.model('CityForum', CityForumSchema);
