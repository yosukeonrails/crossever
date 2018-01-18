var mongoose= require('mongoose');
var bcrypt = require('bcrypts');

var CitySchema= new mongoose.Schema({

  cityId:{
    type:String,
    require:true,
    unique:true
  },
  city:{
    type:String,
    require:true,
  },
  state:{
    type:String,
    require:true,
  },
  country:{
    type:String,
    require:true,
  },
  members:{
    type:Object
  },
  gameID:{
    type:String,
    require:true,
    unique:true
  }

})


  var City= module.exports = mongoose.model('City', CitySchema);
