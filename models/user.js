
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({

  username: {
     type: String,
     unique: true
  },
  password: {
     type: String,
  },

  facebookId:String,
  first_name:String,
  last_name:String,
  userID:String,
  nickname:String,
  facebookId:String,
  token:String,
  first_name:String,
  userID:String,
  userImage:String

});




UserSchema.methods.validatePassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(err, isValid) {
        if (err) {
            callback(err);
            return;
        }
        callback(null, isValid);
    });
};


var User= module.exports = mongoose.model('User', UserSchema);

  module.exports.createUser= function (newUser, callback ){

    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(newUser.password, salt , function(err, hash ){

          newUser.password= hash;
          newUser.save(callback);

      });
});
  };


module.exports.getUserByUsername= function(username, callback){
     var query= {
       username:username
     };

     User.findOne(query, callback);
};

module.exports.comparePassword= function(candidatePassword, hash , callback ){

    bcrypt.compare(candidatePassword, hash , function(err, isMatch){
       if(err) throw err;

       callback(null, isMatch);
    });

};


module.exports.getUserById= function(id, callback){

     User.findById(id, callback);

};

var User= module.exports = mongoose.model('User', UserSchema);
