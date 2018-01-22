console.log('catch me if you can')

require('babel-polyfill');

var React = require('react');
var ReactDOM = require('react-dom');

var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var Link = router.Link;

import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'
import {connect} from 'react-redux';
import {getTopGames,searchGame,createGameGroup,getGameGroupById,getGameCityById, createGameCity,createUserInformation,setUserInfo} from '../actions/index.js'
import GameBubbleContainer from './game-bubble.js'
import SelectedGamesContainer from './selected-games.js'


export class SetupStep4 extends React.Component{

    constructor(props){
      super(props)
    }

    componentDidMount(){

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


         this.props.selectedGameDataArray.map(function(game){

           // checks if game exists
            // find One, if found get the members and make = members and push user to member and update group
            // add also to city

            var str=location.country+ location.state+location.city
            var cityID= str.replace(/ /g,'').toLowerCase();
            var gameCityID= cityID+game._id;
            var cityName= game.name+' '+location.city;
           // if not , create

           var group= {
             name: game.name,
             gameData:game,
             gameID:game._id,
             members:members
           }

          var city= {
            name:cityName,
            gameCityID:gameCityID,
            gameID:game._id,
            cityID:cityID,
            location:location,
            members:cityMembers
          }
            console.log(city);
            console.log(group);

           dis.checkGroupExistance(user,group,city)
            //    dis.props.dispatch(createGameGroup(group))
            //    dis.props.dispatch(createCity(city))

                console.log('dispateched')
         })
    }



    updateOrCreateUser(loggedUser, userInfo){

        console.log('creating user')


        var userData= {
          userID:loggedUser.userID,
          username:loggedUser.username,
          userInformation:userInfo
        }

      console.log(userData)

        this.props.dispatch(createUserInformation(userData));
    }

    checkGroupExistance(user,group,city){


      var dis= this;
      this.props.dispatch(getGameGroupById(group.gameID)).then(function(res){

       if(res.payload.length==0){

          // add only one member and then create group
          group.members= [user]
          dis.createGroup(group)
         // create city
          dis.checkCityExistance(user, group, city)
       }
         else {
         //update by taking its members and pushing user
          dis.updateGroup(res.payload[0] ,user )
          // check existance of city group
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
                city.members=[user];
                dis.createCity(city);
              } else {
                dis.updateGameCity(res.payload[0] , user )
              }

         })

    }

    createCity(city){
        console.log('creating city')
        this.props.dispatch(createGameCity(city))
    }

    createGroup(group){

      console.log('creating group');
      this.props.dispatch(createGameGroup(group))

    }

    updateGroup( group, user){
        console.log('updating group')
      var groupData= {
        name: group.name,
        gameData:group.gameData,
        gameID:group.gameID,
        members:group.members
      }

      // see if there is a duplicate of the user in the group member

      group.members.push(user);

      this.props.dispatch(createGameGroup(groupData))

    }

    updateGameCity( city, user){

      console.log('updating city')
      var cityData= {
        name:city.name,
        gameCityID:city.gameCityID,
        gameID:city.gameID,
        cityID:city.cityID,
        location:city.location,
        members:city.members
      }

    // see if there is a duplicate of the user in the city member

      city.members.push(user);

      this.props.dispatch(createGameCity(cityData))

    }



    render () {


      return(

        <div>
        <h1> All done! Enjoy CrossEver by meeting gamers around your city! </h1>
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
            userInformation:state.userInformation
        }

  }



var SetupStep4Container = connect(mapStateToProps)(SetupStep4);

export default SetupStep4Container;
