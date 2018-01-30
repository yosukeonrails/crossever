console.log('catch me if you can')

require('babel-polyfill');

var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Route = router.Route;
var Link = router.Link;

import {getFacebookUser, getUserInformation, getPostByID} from '../actions'
import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'
import {connect} from 'react-redux';

var openPost=[];
var imageUrl= 'url(/assets/icons/user.png)'
var matchingData= {
  team:{image: "/assets/icons/teamrequest.png",name:"Team Request"},
events:{image: "/assets/icons/events.png",name:"Events"},
general:{image: "/assets/icons/discussion.png",name:"General Discussion"},
}

export class OpenPost extends React.Component{


    constructor(props){
      super(props)

      this.checkUserType = this.checkUserType.bind(this);


      }


      checkUserType(){

            if(this.props.data.user.facebookId !== 'guest'){
               imageUrl ='url(https://graph.facebook.com/'+this.props.data.user.facebookId+'/picture?width=300&height=300)'
            } else {
               imageUrl= 'url(/assets/icons/user.png)'
            }

      }


      render () {


      this.checkUserType()

        return(

          <div className="group-post">

               <div className= "group-post-top">

                   <div className="post-type">
                      <img src={matchingData[this.props.data.topic].image}></img>
                      <h3 >{matchingData[this.props.data.topic].name}</h3>
                   </div>
                   <div className="post-title">
                          <h1> {this.props.data.title} </h1>
                   </div>
                   <div className="post-location">
                            <h3></h3>
                   </div>

                   </div>

               <div className= "group-post-bottom">

                  <h2>{this.props.data.message}</h2>

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

export class PostPage extends React.Component{

  constructor(props){

    super(props)

      this.props.dispatch(getPostByID(this.props.params.id)).then(function(data){

      })

    }

    getPostByID(){

    }

    render () {

      if(this.props.openPost !== null){

          openPost= <OpenPost data={this.props.openPost} />;

      }

      return(

          <div className="open-post">


              {openPost}


          </div>

    );
  }
}


  var mapStateToProps= function(state){
        console.log(state);

        return {
            loggedUser:state.loggedUser,
            openPost:state.openPost
        }

  }

   var PostPageContainer = connect(mapStateToProps)(PostPage);

export default PostPageContainer;
