
require('babel-polyfill');

var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Route = router.Route;
var Link = router.Link;

import {getFacebookUser, getUserInformation,changeDisplaySettings} from '../actions'
import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'
import {connect} from 'react-redux';
import DateComparator from './date_creator.js';

var imageUrl= 'url(/assets/icons/user.png)'

var matchingData= {
  team:{image: "/assets/icons/teamrequest.png",name:"Team Request"},
events:{image: "/assets/icons/events.png",name:"Events"},
general:{image: "/assets/icons/discussion.png",name:"General Discussion"},
}


export class GroupPost extends React.Component{

  constructor(props){

    super(props)
      this.redirectToPost= this.redirectToPost.bind(this);
      this.hoveredGroup= this.hoveredGroup.bind(this);
      this.hoveredOut= this.hoveredOut.bind(this);

      var display= {}
      Object.assign(display, this.props.display_settings);
      display.sidebar.display='block';
      display.viewPort.marginLeft='200px';
      this.props.dispatch(changeDisplaySettings(display));

      let utc = this.props.data.time;
      let comparator = new DateComparator(utc);
      let time_stamp= comparator.compare();
       this.state = {time_stamp:time_stamp};

    }



    hoveredGroup(e){
      $("#"+this.props.key_id).css("width", "72%");
      $("#"+this.props.key_id).css("border", "1px solid white");
    }


    hoveredOut(e){
      $("#"+this.props.key_id).css("width", "70%");
      $("#"+this.props.key_id).css("border", "none");
  }


    redirectToPost(){

        hashHistory.push('/crossever_post/'+this.props.data._id);

    }


    render () {

      //console.log(this.props.data.time);



      return(


          <div id={this.props.key_id} onMouseOut={this.hoveredOut} onMouseOver={this.hoveredGroup} onClick= {this.redirectToPost} className="group-post">

               <div className= "group-post-top">

                   <div className="post-type">
                      <img src={matchingData[this.props.data.topic].image}></img>
                      <h3>{matchingData[this.props.data.topic].name}</h3>
                   </div>
                   <div className="post-title">
                        <h1> {this.props.data.title} </h1>
                   </div>
                   <div className="post-location">
                            <h3></h3>
                   </div>

               </div>

               <div className= "group-post-bottom">



                  <div className="post-bottom-icons-container">

                        <div id="post-bottom-icons">
                          <div id="post-bottom-icon"><img src="/assets/icons/comment.png"></img><h2>{this.props.data.comments}</h2><h3>comments</h3></div>
                          <div id="post-bottom-icon"><img src="/assets/icons/heart-icon.png"></img><h2>{this.props.data.likedBy.length}</h2><h3>likes</h3></div>
                        </div>

                  </div>

                  <div className="group-post-user">

                        <div className="group-post-user-left">
                        <h2>{this.props.data.user.first_name}</h2>
                        <h3>{this.state.time_stamp}</h3></div>

                      <div className="group-post-user-right">
                          <div className="group-post-user-picture" style={{backgroundImage:'url('+this.props.data.user.userImage+')'}}></div>
                      </div>


                  </div>

               </div>

          </div>

    );
  }
}


  var mapStateToProps= function(state){

        return {
            loggedUser:state.loggedUser,
            display_settings:state.display_settings
        }

  }

   var GroupPostContainer = connect(mapStateToProps)(GroupPost);

export default GroupPostContainer;
