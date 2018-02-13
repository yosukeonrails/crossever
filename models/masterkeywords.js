var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var MasterKeyWordSchema= new mongoose.Schema({
  //
  // postID:{
  //   type:String,
  //   require:true,
  //   unique:true
  // },

  cityID:{
    type:String,
    require:true
  },
  masterKeyArray:{
    type:Array
  }

})


  var MasterKeyWord= module.exports = mongoose.model('MasterKeyWord', MasterKeyWordSchema);
