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
import {getTopGames,searchGame,createGameGroup} from '../actions/index.js'
import GameBubbleContainer from './game-bubble.js'
import SelectedGamesContainer from './selected-games.js'



export class SetupStep4 extends React.Component{

    constructor(props){
      super(props)
    }

    componentDidMount(){
        // get all games into a checked games array
         console.log(this.props.selectedGameDataArray)
         var dis= this;

         var members=[];
         var loggedUser= this.props.loggedUser;
         var userInfo= this.props.userInformation;

         this.props.selectedGameDataArray.map(function(game){


           // checks if game exists
           // if not , create
           var user= {
             name:loggedUser.first_name,
             username:loggedUser.username,
             facebookId:loggedUser.facebookId,
             userInfo:userInfo
           }
           var group= {
             name: game.name,
             gameData:game,
             gameID:game._id,
             members:members
           }


                dis.props.dispatch(createGameGroup(group))
                console.log('dispateched')
         })
    }



    checkGroupExistance(){

    }

    createGroup(){

    }

    addMemberToGroup(){

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
