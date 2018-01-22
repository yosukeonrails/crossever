var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserInformationSchema= new mongoose.Schema({

  userID:{
    // this is a unique identifier that only works when the person logged is the same as this ID
    type:String,
    require:true,
    unique:true
  },
  username:{
    type:String,
    require:true
  },
  userInformation:{
    type:Object
  }

})


var UserInformation= module.exports = mongoose.model('UserInformation', UserInformationSchema);
