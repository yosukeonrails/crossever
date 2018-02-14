var mongoose = require('mongoose');
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config= require('./config');
var passport= require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
//var FacebookUser= require('./models/facebookuser.js');
var Comments= require('./models/comments.js');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var Post= require('./models/post.js')
var User= require('./models/user.js');
var GameGroup= require('./models/gamegroup.js');
var GameCity= require('./models/gamecity.js')
var UserInformation= require('./models/userinformation.js');
var DiscordChanel = require('./models/discordchanels.js')
mongoose.Promise = global.Promise;
var MasterKeyWord = require('./models/masterkeywords.js');

//
// mongoose.createConnection('mongodb://localhost/');
//
// mongoose.connection.on('error', function(err) {
//     console.error('Could not connect.  Error:', err);
// });

// app.use(express.static('build'));
// app.use(express.static('build'));

var jsonParser = bodyParser.json();

app.use(jsonParser);
app.use(bodyParser.json());

app.use(express.static('build'));

app.use(require('cookie-parser')());

app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
//
// app.use(passport.initialize());
// app.use(passport.session());



//app.use(express.cookieParser());
//app.use(express.bodyParser());
//app.use(express.session({ secret: 'anything' }));
app.use(passport.initialize());
app.use(passport.session());
//app.use(app.router);

passport.serializeUser(function(user, done) {
      console.log(user);
      console.log('serializing at fb')
    done(null, user._id);

});


// used to deserialize the user
passport.deserializeUser(function(id, done) {

    console.log('deserializing at facebook!')

    User.findById(id, function(err, user) {
            console.log(user);
        done(err, user);
    });

});


// // used to deserialize the user
// passport.deserializeUser(function(user, done) {
//
//     console.log('deserializing at fb')
//
//     FacebookUser.findById(user, function(err, user) {
//             console.log(user);
//             console.log(err)
//         done(err, user);
//     });
//
//   done(null, user._id);
//
// });
//


  //
  //   app.get('/logout', function(req, res){
  //
  //         req.logout();
  //         res.redirect('/');
  //         console.log('user is logged out');
  //
  // });

  app.get('/logout', function (req, res){
    req.session.destroy(function (err) {
      console.log('session destroyed')
      res.redirect('/'); //Inside a callback… bulletproof!
    });
  });



/* user sign up start*////// LOCAL STRATEGY //////////

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
        facebookId:req.body.facebookId,
        userID:req.body.username,
        userImage:req.body.userImage
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

//
//
// passport.serializeUser(function(user, done) {
//   console.log('here we go~~~ at local!!!!!!')
//   console.log(user);
//     done(null, user.id);
//
// });
//
// passport.deserializeUser(function(id, done) {
//   console.log('deserializing!')
//     User.getUserById(id, function(err, user) {
//         done(err, user);
//     });
// });


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

    passport.authenticate('local',{failureRedirect:'/#/loginpage'}),

    function(req, res) {

      console.log(res);
        console.log('here is the user')
        console.log(req.user)

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
          nickname:profile.displayName,
          facebookId:profile.id,
          token:profile.accessToken,
          userID:profile.id,
          userImage:"https://graph.facebook.com/"+profile.id+"/picture?width=300&height=300"
      // email:profile.email
    };


    User.findOneAndUpdate({ facebookId: profile.id },{$set:userData}, { upsert: true, new: true } , function (err, user) {

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

       res.redirect('/#/userdashboard');

     });


    app.get('/user', function(req, res){

        console.log('GOT USER')

         res.json(req.user);

        console.log(req.user);

    });

//*Facebook login ends



//* get user by user ID*//
app.get('/user/:userID', function(req,res){

    User.find({ username:req.params.userID }, function(err, data){

      if(err){

      }

      res.json(data);
  });


})




//* Posts

app.get('/post/id/:id', function(req,res){

    Post.findOne({ _id:req.params.id }, function(err, data){

      if(err){

      }
      console.log(data)
      res.json(data);
  });


})

app.delete('/post/id/:id', function(req,res){


      Post.remove({ _id:req.params.id }, function(err, data){

            if(err){

            }
            console.log(data)
            res.json(data);
      });


})


  app.get('/post/group/:groupID', function(req,res){

      Post.find({ groupID:req.params.groupID }, function(err, data){

        if(err){

        }
        console.log(data)
        res.json(data);
    });


  })

   app.post('/post', function(req, res){

         var postData = {
              //  postID=req.body.postID,
                groupID: req.body.groupID,
                user: req.body.user,
                tag: req.body.tag,
                groupType: req.body.groupType,
                title:req.body.title,
                message: req.body.message,
                likedBy: req.body.likedBy,
                popularity: req.body.popularity,
                topic: req.body.topic,
                time: new Date(),
                comments:req.body.comments
         }

         Post.create( postData , function(err, data){
             if(err){console.log(err)};
             console.log(data);
             res.status(201).json(data);
         })
   })


   app.put('/post',  function(req, res){

      var query= {_id:req.body.postID};

        var data={
          groupID: req.body.groupID,
          user: req.body.user,
          tag: req.body.tag,
          groupType: req.body.groupType,
          title:req.body.title,
          message: req.body.message,
          likedBy: req.body.likedBy,
          popularity: req.body.popularity,
          topic: req.body.topic,
          time: new Date(),
          comments:req.body.comments
        }
          console.log('here is post ID')
          console.log(req.body.postID)
    Post.updateOne( query , data ,function(err, data){

      if(err){console.log(err)};
      console.log('here is data')
      console.log(data);
      res.status(201).json(data);

    })
   })

/// Comments ///

app.post('/comments', function(req, res){

      var postData = {
           //  postID=req.body.postID,
             postID: req.body.postID,
             user: req.body.user,
            // tag: req.body.tag,
            // groupType: req.body.groupType,
             //title:req.body.title,
             message: req.body.message,
             likes: req.body.likes,
             popularity: req.body.popularity,
             //topic: req.body.topic,
             time: new Date(),
             reply:req.body.reply
      }

      Comments.create( postData , function(err, data){
          if(err){console.log(err)};
          console.log(data);
          res.status(201).json(data);
      })
})



app.get('/comments/id/:postID', function(req, res){

  Comments.find({ postID:req.params.postID }, function(err, data){

    if(err){

    }
    console.log(data)
    res.json(data);
});

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




  app.put('/gamegroup', function(req, res ){
  console.log('gamegroup upating')
        var query={
            gameID:req.body.gameID
        }

        var data={$push: {members:req.body.members}  }


    GameGroup.updateOne(query , data , function(err, data ){

      if(err){ console.log(err)}

    console.log('gamegroup upated')
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



    app.get('/gamegroup/', function(req, res){

          GameGroup.find({}, function(err, data){

              if(err){

              }

              console.log(data)
              res.json(data);
        });

    });


        app.get('/gamegroup/member/:userid', function(req, res){

          var userID= req.params.userid;

          GameGroup.find( { members: { $all: [userID] } } , function(err, data){


            if(err){

            }

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
                  members:req.body.members,
                  gameData:req.body.gameData
                }
              }

          GameCity.findOneAndUpdate(query, data, {upsert:true,new:true}, function(err, data){

              console.log('gamegroup upating')
              if(err){ console.log(err)}

            console.log(data)
            res.status(201).json(data);

          })

        })



        app.put('/gamecity', function(req, res ){

              var query={
                  gameCityID:req.body.gameCityID
              }

              var data={ $push: {members:req.body.members}  }


          GameCity.updateOne(query , data , function(err, data ){

            if(err){ console.log(err)}

            console.log('gamecity upated')
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



    app.get('/gamecity/member/:userid', function(req, res){

      var userID= req.params.userid;

      GameCity.find( { members: { $all: [userID] } } , function(err, data){

        if(err){

        }

        res.json(data);
    });

    });


    app.get('/gamecity/state/:id', function(req, res){

          GameCity.find({ "location.state":req.params.id }, function(err, data){

            if(err){

            }

            res.json(data);
        });

    });

    app.get('/gamecity/country/:id', function(req, res){

          GameCity.find({ "location.country":req.params.id }, function(err, data){

            if(err){

            }

            res.json(data);
        });

    });

    app.get('/gamecity/city/:id', function(req, res){

          GameCity.find({ "location.city":req.params.id }, function(err, data){

            if(err){

            }

            res.json(data);
        });

    });

    //** DISCORD CHANNELS


    app.get('/discord_chanel/gamecity/:gameCityID' , function(req, res){
         DiscordChanel.find({gameCityID:req.params.gameCityID}, function(err,data){
              if(err){
                console.log(err)
              }
              console.log(data)
              res.json(data);
         })
    })

      app.post('/discord_chanel', function(req, res){

             var data = {
                  //  postID=req.body.postID,
                    name: req.body.name,
                    link: req.body.link,
                    gameCityID: req.body.gameCityID,
                    gameID: req.body.gameID,
                    locationData:req.body.locationData
             }

             DiscordChanel.create( data , function(err, data){
                 if(err){console.log(err)};
                 console.log(data);
                 res.status(201).json(data);
             })
       })

    //* KEY WORDS *  //

    app.get('/keyword/:cityID' , function(req, res){

         MasterKeyWord.find({cityID:req.params.cityID}, function(err,data){
              if(err){
                console.log(err)
              }
              console.log(data)
              res.json(data);
         })

    })

      app.post('/keyword', function(req, res){

            var query= {cityID:req.body.cityID}

            var userData={
              $set:{
                masterKeyArray:req.body.masterKeyArray
              }
            }

        MasterKeyWord.findOneAndUpdate(query, userData, {upsert:true,new:true}, function(err, data){

            if(err){ console.log(err)}

            console.log(data)
            res.status(201).json(data);

        })

      })





    //*    USER INFORMATION

  app.get('/userinformation/:userID' , function(req, res){
       UserInformation.find({userID:req.params.userID}, function(err,data){
            if(err){
              console.log(err)
            }
            console.log(data)
            res.json(data);
       })
  })

    app.post('/userinformation', function(req, res){

          var query= {userID:req.body.userID}

          var userData={
            $set:{
              userID:req.body.userID,
              username:req.body.username,
              details:req.body.details,
              setup:req.body.setup
            }
          }

      UserInformation.findOneAndUpdate(query, userData, {upsert:true,new:true}, function(err, data){

          if(err){ console.log(err)}

          console.log(data)
          res.status(201).json(data);

      })

    })





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
