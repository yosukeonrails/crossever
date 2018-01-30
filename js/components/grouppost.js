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
var imageUrl= 'url(/assets/icons/user.png)'

var matchingPicture= {
  team:"/assets/icons/teamrequest.png",
  events:"/assets/icons/events.png",
  general:"/assets/icons/discussion.png"
}

export class GroupPost extends React.Component{

  constructor(props){

    super(props)
      this.checkUserType = this.checkUserType.bind(this);
    }

    checkUserType(){
          if(this.props.data.user.facebookId !== 'guest'){
             imageUrl ='url(https://graph.facebook.com/'+this.props.data.user.facebookId+'/picture?width=300&height=300)'
          }
    }



    render () {

      console.log(this.props)

      this.checkUserType()

      return(

          <div className="group-post">

               <div className= "group-post-top">

                   <div className="post-type">
                      <img src={matchingPicture[this.props.data.topic]}></img>
                      <h3 >Team Request</h3>
                   </div>
                   <div className="post-title">
                        <h1> {this.props.data.title} </h1>
                   </div>
                   <div className="post-location">
                            <h3></h3>
                   </div>

               </div>

               <div className= "group-post-bottom">
                    <h2> {this.props.data.message} </h2>


                  <div className="post-bottom-icons-container">

                        <div id="post-bottom-icons">
                          <div id="post-bottom-icon"><img src="/assets/icons/comment.png"></img><h2>2</h2><h3>comments</h3></div>
                          <div id="post-bottom-icon"><img src="/assets/icons/heart-icon.png"></img><h2>4</h2><h3>likes</h3></div>
                        </div>

                  </div>

                  <div className="group-post-user">

                      <div className="group-post-user-left">
                      <h2>{this.props.data.user.first_name}</h2>
                      <h3>Today @ 12:43 AM</h3></div>

                      <div className="group-post-user-right">
                          <div className="group-post-user-picture" style={{backgroundImage:imageUrl}}></div>
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
