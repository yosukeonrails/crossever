var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var DiscordChanelSchema= new mongoose.Schema({

  name:{
    type:String
  },
  link:{
    type:String
  },
  gameCityID:{
    type:String
  },
  gameID:{
    type:String
  },
  locationData:{
    type:Object
  }

})


  var DiscordChanel= module.exports = mongoose.model('DiscordChanel', DiscordChanelSchema);
