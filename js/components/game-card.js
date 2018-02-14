
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

    this.goToForum= this.goToForum.bind(this)


    }

    goToForum(){
      var dis=this;
       hashHistory.push('/gamecity/'+dis.props.data.gameCityID)
      //    hashHistory.push('/grouppage/'+dis.props.id);
    }

    render () {


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
                    <div className="card-icon" id="forum-button"><img onClick={this.goToForum} src="/assets/icons/forum.png"></img></div>

                    <div className="game-card-numbers">
                      <div id="number"> <h1>{this.props.data.members.length}</h1></div>
                    
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

        return {
            loggedUser:state.loggedUser,
        }

  }

   var GameCardContainer = connect(mapStateToProps)(GameCard);

export default GameCardContainer;
