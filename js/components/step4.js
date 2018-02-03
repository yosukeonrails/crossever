console.log('catch me if you can')

require('babel-polyfill');

var React = require('react');
var ReactDOM = require('react-dom');

var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var Link = router.Link;

import LoadingContainer from './loading.js'
import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'
import {connect} from 'react-redux';
import {getTopGames,searchGame,createGameGroup,getGameGroupById,getGameCityById, createGameCity,createUserInformation,setUserInfo,setUpInformation,updateGameGroup,updateGameCity} from '../actions/index.js'
import GameBubbleContainer from './game-bubble.js'
import SelectedGamesContainer from './selected-games.js'
var memberOf= {group:[], city:[] }
var bits = null;
var percentage= 0;
export class SetupStep4 extends React.Component{

    constructor(props){
      super(props);

    }

    componentDidMount(){

      console.log(this.props);
      this.props.setPercentage('block', 0);

         var dis= this;

         //1. GET Game by game


         var members=[];
         var cityMembers=[];



         var user= {
           name:this.props.loggedUser.first_name,
           username:this.props.loggedUser.username,
           userID:this.props.loggedUser.userID,
           details:this.props.userInformation.details
         }


         var loggedUser= this.props.loggedUser;
         var userInfo= this.props.userInformation;
         var location=this.props.userInformation.details. locationSummary;


    //2. For each game selected,

         bits= (100/ this.props.selectedGameDataArray.length);
         percentage= 0;
         console.log(bits)

                       this.props.selectedGameDataArray.map(function(game){

                        // define Ids for group and city

                          var str=location.country+ location.state+location.city
                          var cityID= str.replace(/ /g,'').toLowerCase();
                          var gameCityID= cityID+game._id;
                          var cityName= game.name+' '+location.city;

                    // define group and city data.

                         var group= {
                           name: game.name,
                           gameData:game,
                           gameID:game._id,
                           members:[]
                         }

                        var city= {
                          name:cityName,
                          gameData:game,
                          gameCityID:gameCityID,
                          gameID:game._id,
                          cityID:cityID,
                          location:location,
                          members:[]
                        }

                      // 3. check if the group already exists

                         dis.checkGroupExistance(user,group,city)


                       })


    }



    updateOrCreateUser(loggedUser, userInfo){

        console.log('creating user')


        var userData= {
          userID:loggedUser.userID,
          username:loggedUser.username,
          userInformation:userInfo
        }

        this.props.dispatch(createUserInformation(userData));
    }

    checkGroupExistance(user,group,city){



      var dis= this;
       this.props.dispatch(getGameGroupById(group.gameID)).then(function(res){

 // if there is no group yet
       if(res.payload.length==0){
         // create a group



        group.members=[user.userID]
        dis.createGroup(group)



      //then check if the city exists
          dis.checkCityExistance(user, group, city)
       }

         else {
// if it exists , updata the group by ading the user // ** might not need if $push in mongodb works

          dis.updateGroup(res.payload[0] , user )
    // check existance of city group
          //** might not need tis gameCityID
          var gameCityID= user.details.locationSummary
          dis.checkCityExistance(user, group, city)

        }

      })


    }

    checkCityExistance(user, group , city){



      var dis= this;

         this.props.dispatch(getGameCityById(city.gameCityID)).then(function(res){

              if(res.payload.length===0){
                 // if i doesnt exist yet add member and create
                city.members=[user.userID];
                dis.createCity(city);

              } else {

                // if does just update *** might not need this after the $push update
                dis.updateGameCity(res.payload[0] , user )

              }

         })

    }

    createCity(city){
        var dis=this;
        // addding a member Of object to user Info //

        console.log('creating city')
        memberOf.city.push(city.gameCityID);

        this.props.dispatch(createGameCity(city)).then(function(){
          percentage= percentage+ (bits/2);
          dis.props.setPercentage('block', percentage );
        })

    }

    createGroup(group){
        var dis=this;
      console.log('creating group');
      console.log(group)
      memberOf.group.push(group.gameID);

      this.props.dispatch(createGameGroup(group)).then(function(){
        percentage= percentage+ (bits/2);
        dis.props.setPercentage('block', percentage );
      })

    }

    updateGroup( group, user){
      var dis=this;

      var groupData= {
        gameID:group.gameID,
        members:user.userID
      }

      // see if there is a duplicate of the user in the group member

    //  group.members.push(user);
      memberOf.group.push(group.gameID);
      this.props.dispatch(updateGameGroup(groupData)).then(function(data){
        percentage= percentage+ (bits/2);
        dis.props.setPercentage('block', percentage );
      })

    }



    updateGameCity( city, user){
        var dis=this;

      var cityData= {
        gameCityID:city.gameCityID,
        members:user.userID
      }

    // see if there is a duplicate of the user in the city member

    //  city.members.push(user);
      memberOf.city.push(city.gameCityID);

      this.props.dispatch(updateGameCity(cityData)).then(function(data){
        percentage= percentage+ (bits/2);
        dis.props.setPercentage('block', percentage );
      })


    }


    updateUserSetUp(memberOf){

        var setUp=  this.props.setUpInformation

        Object.assign(setUp , {memberOf:memberOf});

        this.props.dispatch(setUpInformation(setUp));
    }


    render () {

      console.log('rendering')
      console.log(this.props.setUpInformation)
      console.log(memberOf)

      if(this.props.setUpInformation){

        if(!this.props.setUpInformation.memberOf){

            this.updateUserSetUp(memberOf)
        }

        this.updateUserSetUp(memberOf)} else{

        console.log('it has user so move on')

      }

      return(

        <div>

        <div className="step-4">
        <h1> All done! Enjoy CrossEver by meeting gamers around your city! </h1>
        </div>

        </div>

    );
  }
}




  var mapStateToProps= function(state){
    console.log(state)

        return {
            loggedUser:state.loggedUser,
            manuallyLogged:state.manuallyLogged,
            foundGames:state.foundGames,
            selectedGameDataArray:state.selectedGameDataArray,
            userInformation:state.userInformation,
            setUpInformation:state.setUpInformation
        }

  }



var SetupStep4Container = connect(mapStateToProps)(SetupStep4);

export default SetupStep4Container;
