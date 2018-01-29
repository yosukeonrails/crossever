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



export class GroupPost extends React.Component{

  constructor(props){

    super(props)

    }

    render () {



      return(

          <div className="group-post">

               <div className= "group-post-top">

                   <div className="post-type">
                      <img src="/assets/icons/teamrequest.png"></img>
                      <h3 >Team Request</h3>
                   </div>
                   <div className="post-title">
                        <h1> Getting a team together </h1>
                   </div>
                   <div className="post-location">
                      <h3> Seattle , WA </h3>
                   </div>

               </div>

               <div className= "group-post-bottom">
                    <h2> Hey everyone! Kind of new to the game but ready to get a kick-ass
                    team together mostly for PVP focus. I am an archer focused mainly
                    on high DPS. Looking for mages, beserkers to complete the team!</h2>

                            <div className="post-bottom-number-container"><h2 style={{textAlign:'center'}}>3</h2><h2 style={{textAlign:'left' , right:'4%'}}>13</h2></div>

                  <div className="post-bottom-icons-container">

                        <div id="post-bottom-icons">
                          <div id="post-bottom-icon"><img src="/assets/icons/comment.png"></img><h3>comments</h3></div>
                          <div id="post-bottom-icon"><img src="/assets/icons/heart-icon.png"></img><h3>likes</h3></div>
                        </div>

                  </div>

                  <div className="group-post-user">
                  
                      <div className="group-post-user-left">
                      <h2>post by Yosuke</h2>
                      <h3>Today @ 12:43 AM</h3></div>

                      <div className="group-post-user-right">
                            <img src="/assets/icons/teamrequest.png"></img>
                      </div>


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

   var GroupPostContainer = connect(mapStateToProps)(GroupPost);

export default GroupPostContainer;
