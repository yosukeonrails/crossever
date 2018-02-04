console.log('catch me if you can')

require('babel-polyfill');

var React = require('react');
var ReactDOM = require('react-dom');
var hoverStyle='';
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var Link = router.Link;


import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'
import {connect} from 'react-redux';
import {getTopGames,searchGame, addToSelectedGame, addToGameIdList} from '../actions/index.js'
import GameBubbleContainer from './game-bubble.js'

export class SelectedGames extends React.Component{

  constructor(props){

    super(props)


  }

    render () {
      var array= [];
      var dis= this;
      this.props.selectedGameDataArray.map(function(game, i ){
          console.log(game)
            var imageURL= 'url('+game.box.large+')';
            var selected= true;
          console.log(dis.props)
           array.push(<div className="selected-bubble" style={{float:dis.props.styles.bubbleLeft}}> <GameBubbleContainer styles={dis.props.styles} name={game.name}  selected={false} imageURL={imageURL} id={i} key={i} data={game} /> </div>)

      })

      return(

        <div className="selected-game-container" >


           {array}


        </div>


    );
  }
}




  var mapStateToProps= function(state){

        return {
            loggedUser:state.loggedUser,
            selectedGameDataArray:state.selectedGameDataArray,
            gameIdList:state.gameIdList

        }

  }



var SelectedGamesContainer = connect(mapStateToProps)(SelectedGames);

export default SelectedGamesContainer;
