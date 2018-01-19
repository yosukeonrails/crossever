
var mongoose = require('mongoose');
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config= require('./config');
var passport= require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var FacebookUser= require('./models/facebookuser.js');

var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');

var User= require('./models/user.js');
var GameGroup= require('./models/gamegroup.js');
var GameCity= require('./models/gamecity.js')

mongoose.Promise = global.Promise;

//
// mongoose.createConnection('mongodb://localhost/');
//
// mongoose.connection.on('error', function(err) {
//     console.error('Could not connect.  Error:', err);
// });



// app.use(express.static('build'));

var jsonParser = bodyParser.json();

app.use(jsonParser);
app.use(bodyParser.json());
app.use(express.static('build'));


app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
      console.log(user);
    done(null, user._id);

});

// used to deserialize the user
passport.deserializeUser(function(id, done) {

    FacebookUser.findById(id, function(err, user) {
            console.log(user);
        done(err, user);
    });

});




app.post('/user', function(req, res) {

    if (!req.body) {
        return res.status(400).json({
            message: "No request body"
        });
    }

    if (!('username' in req.body)) {
        return res.status(422).json({
            message: 'Missing field: username'
        });
    }

    var username = req.body.username;

    if (typeof username !== 'string') {
        return res.status(422).json({
            message: 'Incorrect field type: username'
        });
    }

    username = username.trim();

    if (username === '') {
        return res.status(422).json({
            message: 'Incorrect field length: username'
        });
    }

          /* handle password*/


    if (!('password' in req.body)) {
        return res.status(422).json({
            message: 'Missing field: password'
        });
    }

    var password = req.body.password;

    if (typeof password !== 'string') {
        return res.status(422).json({
            message: 'Incorrect field type: password'
        });
    }

    password = password.trim();

    if (password === '') {
        return res.status(422).json({
            message: 'Incorrect field length: password'
        });
    }

    var newUser = new User({
        username: username,
        password: password,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        facebookId:req.body.facebookId
    });

    console.log(req.body);

    // newUser.save(function(err){
    //      if(err) throw err;
    //
    //      res.json(newUser);
    // })

    User.createUser(newUser, function(err, user) {
        if (err) throw err;
        console.log(user);
        console.log('user was CREATED!');
        res.json(user);
    });

});

/* user sign up end */




/*login in user start*/

passport.use(new LocalStrategy(

    function(username, password, done) {

        User.getUserByUsername(username, function(err, user) {
            if (err) throw err;
            if (!user) {
                console.log('Unkwown User');
                return done(null, false, {
                    message: 'Unknown User'
                });

            }

            User.comparePassword(password, user.password, function(err, isMatch) {
                if (err) throw err;

                if (isMatch) {

                    console.log('You are Loggeeeeed in');
                    console.log(user)

                    return done(null, user);


                } else {
                    console.log('Invalid Password');
                    return done(null, false, {
                        message: 'Invalid password'
                    });
                }
            });
        });
    }));


passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});


function isLoggedIn(req, res, next) {
    /* For production */
    if (req.isAuthenticated()) {
        return next();
    }
    /* For testing, inject a user manually */
    if (process.env.NODE_ENV == 'test') {

        req.user = {

            '_id': '1',
            'username': 'test',
            'password': 'test'
        };
        return next();
    }

    res.sendStatus(403);
}




app.post('/login',

    passport.authenticate('local'),

    function(req, res) {

        res.json(req.user);

    });


    app.get('/hidden', function(req, res) {

        console.log('using the path');

    });


/*login in user end*/




// # FACEBOOK LOGIN

  passport.use(new FacebookStrategy({

    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: config.URL+'auth/facebook/callback',
    profileFields: ['id', 'displayName', 'first_name']
  }, function(accessToken, refreshToken, profile, done) {


    let userData= {
      first_name:profile._json.first_name,
      username:profile.displayName,
      facebookId:profile.id,
      token:profile.accessToken,
      // email:profile.email
    };


    FacebookUser.findOneAndUpdate({ facebookId: profile.id },{$set:userData}, { upsert: true, new: true } , function (err, user) {

          return done(err, user);

        });

   }));



   app.get('/auth/facebook',
     passport.authenticate('facebook'));


   app.get('/auth/facebook/callback',
     passport.authenticate('facebook', { failureRedirect: '/' }),
     function(req, res) {
       // Successful authentication, redirect home.
       console.log('sucessful login');

          res.redirect('/#/dashboard');
     });


    app.get('/user', function(req, res){

            console.log('/user at enpoint fetch');
            console.log(req.user);
         res.json(req.user);

    });

//# Group
    app.post('/gamegroup', function(req, res){
        // what you will find by
          var query={
            gameID:req.body.gameID
          }

          var data={
            $set:{
              name:req.body.name,
              gameID:req.body.gameID,
              gameData:req.body.gameData,
              members:req.body.members
            }
          }

      GameGroup.findOneAndUpdate(query, data, {upsert:true,new:true}, function(err, data){

          if(err){ console.log(err)}

        console.log(data)
        res.status(201).json(data);

      })

    })


      app.get('/gamegroup/:gameid', function(req, res){

        GameGroup.find({ gameID:req.params.gameid }, function(err, data){

          if(err){

          }
          console.log(data)
          res.json(data);
      });

      });





    //# GameCity

        app.post('/gamecity', function(req, res){

            // what you will find by
              var query={
                gameCityID:req.body.gameCityID
              }

              var data={
                $set:{
                  gameCityID:req.body.gameCityID,
                  name:req.body.name,
                  gameID:req.body.gameID,
                  cityID:req.body.cityID,
                  location:req.body.location,
                  members:req.body.members
                }
              }

          GameCity.findOneAndUpdate(query, data, {upsert:true,new:true}, function(err, data){

              if(err){ console.log(err)}

            console.log(data)
            res.status(201).json(data);

          })

        })




    app.get('/gamecity/:gamecityid', function(req, res){

      GameCity.find({ gameCityID:req.params.gamecityid }, function(err, data){

        if(err){

        }

        res.json(data);
    });

    });


// # FACEBOOK LOGIN ENDS



var runServer = function(callback) {
    mongoose.connect(config.DATABASE_URL, function(err) {
        if (err && callback) {
            return callback(err);
        }
        app.listen( config.PORT, function() {
            console.log('Listening on localhost:' + config.PORT);
            if (callback) {
                callback();
            }
        });
    });
};


if (require.main === module) {
    runServer(function(err) {
        if (err) {
            console.error(err);
        }
    });
}
