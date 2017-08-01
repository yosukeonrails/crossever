
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var FacebookUserSchema = new mongoose.Schema({

      username:String,
      facebookId:String,
      token:String,
      first_name:String

});




var FacebookUser= module.exports = mongoose.model('FacebookUser', FacebookUserSchema);
