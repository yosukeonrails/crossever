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


    // 1.make sure that all of the data is good to go
    console.log(this.props.userInformation);
    console.log(this.props.selectedGameDataArray);
    //2. create group data
       var gameGroup= {

       }
    //3. create city data for group
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
