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
import {getTopGames,searchGame} from '../actions/index.js'
import GameBubbleContainer from './game-bubble.js'
import SelectedGamesContainer from './selected-games.js'



export class SetupStep4 extends React.Component{

  constructor(props){

    super(props)

  }

componentDidMount(){

  }



    render () {


      console.log(this.props.userInformation.locationData)

      if(this.props.userInformation.locationData.address_components){
        var adressInfo= this.props.userInformation.locationData.address_components;

        adressInfo.map(function(location){
            console.log(location.types)

          for(var i=0 ; i>location.types.length ; i++){

              console.log(location.types[i])


          }

        })
      }

      var locationSummary={

      }


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
            topGames:state.topGames,
            foundGames:state.foundGames,
            userInformation:state.userInformation
        }

  }



var SetupStep4Container = connect(mapStateToProps)(SetupStep4);

export default SetupStep4Container;
