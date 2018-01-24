console.log('catch me if you can')

require('babel-polyfill');

var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Route = router.Route;
var Link = router.Link;

import {getFacebookUser, getUserInformation} from '../actions'
import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'
import {connect} from 'react-redux';



export class GameCard extends React.Component{

  constructor(props){

    super(props)

    }


    render () {

    console.log(this.props)

      return(

          <div className="game-card">

            <div className="game-card-top">
                <div className="game-card-image" style={{backgroundImage:'url('+this.props.data.gameData.box.medium+')'}}></div>
                <h1>{this.props.data.name}</h1>
             </div>


             <div className="game-card-bottom">

            <div className="game-card-icon-container">

                    <div className="card-icon"><img src="/assets/icons/group.png"></img></div>
                    <div className="card-icon"><img src="/assets/icons/groupfriend.png"></img></div>
                    <div className="card-icon"><img src="/assets/icons/forum.png"></img></div>

                    <div className="game-card-numbers">
                      <div id="number"> <h1>{this.props.data.members.length}</h1></div>
                      <div id="number"> <h1>3</h1></div>
                        <div id="number">  </div>
                    </div>
            </div>
            

            <div className="game-card-labels">
                    <h2>members</h2>
                    <h2>friends</h2>
                    <h2>forum</h2>
            </div>

             </div>

          </div>

    );
  }
}


  var mapStateToProps= function(state){
        console.log(state);

        return {
            loggedUser:state.loggedUser,
        }

  }

   var GameCardContainer = connect(mapStateToProps)(GameCard);

export default GameCardContainer;
