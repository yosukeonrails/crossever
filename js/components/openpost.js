require('babel-polyfill');

var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Route = router.Route;
var Link = router.Link;

import {getFacebookUser, getUserInformation, getPostByID,getCommentsByPostID,updatePost} from '../actions'
import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'
import {connect} from 'react-redux';
import CommentsContainer from './comments'
import CommentWriter from './comment-writer'
var comments=[];
var openPost=[];
var imageUrl= 'url(/assets/icons/user.png)'
var matchingData= {
  team:{image: "/assets/icons/teamrequest.png",name:"Team Request"},
events:{image: "/assets/icons/events.png",name:"Events"},
general:{image: "/assets/icons/discussion.png",name:"General Discussion"},
}
var heartStyle="brightness(175%)";

export class OpenPost extends React.Component{


    constructor(props){
      super(props)

      this.checkUserType = this.checkUserType.bind(this);
      this.likePost= this.likePost.bind(this);
      
      console.log(this.props.openPost)
      if(this.props.openPost.likedBy.includes(this.props.loggedUser.userID)){
      
        this.state= {
          heartStyle:"none"
        }

      } else {
        this.state= {
          heartStyle:"brightness(175%)"
        }
      }
        
      
      }

      likePost(){

        let data= {};



        console.log(this.props.openPost);

        Object.assign(data, this.props.openPost);
        Object.assign(data, {postID: this.props.openPost._id} )
        let index=  data.likedBy.indexOf(this.props.loggedUser.userID);

        if(index!==-1){
          
          data.likedBy.splice(index, 1);
          
          this.props.dispatch(updatePost(data));
          this.setState({heartStyle:'brightness(170%)'});
          
        } else {
          
          data.likedBy.push(this.props.loggedUser.userID);
          
            this.props.dispatch(updatePost(data));  
            this.setState({heartStyle:'none'});
        }
        
      
    

      }

      checkUserType(){

            if(this.props.loggedUser.facebookId !== 'guest'){
               imageUrl ='url(https://graph.facebook.com/'+this.props.loggedUser.facebookId+'/picture?width=300&height=300)'
            } else {
               imageUrl= 'url(/assets/icons/user.png)'
            }

      }


      render () {

      console.log('re-render at openPost');
      console.log(this.state)
      this.checkUserType()


        return(

          <div className="group-post">

               <div className= "group-post-top">

                   <div className="post-type">
                      <img src={matchingData[this.props.openPost.topic].image}></img>
                      <h3 >{matchingData[this.props.openPost.topic].name}</h3>
                   </div>
                   <div className="post-title">
                          <h1> {this.props.openPost.title} </h1>
                   </div>
                   <div className="post-location">
                            <h3></h3>
                   </div>

                   </div>

               <div className= "group-post-bottom">

                  <h2>{this.props.openPost.message}</h2>

                  <div className="post-bottom-icons-container">

                        <div id="post-bottom-icons">
                          <div id="post-bottom-icon"><img src="/assets/icons/comment.png"></img><h2>{this.props.openPost.comments}</h2><h3>comments</h3></div>
                          <div id="post-bottom-icon">< img onClick={this.likePost} style={{ filter:this.state.heartStyle }} src="/assets/icons/heart-icon.png"></img><h2>{this.props.openPost.likedBy.length}</h2><h3>likes</h3></div>
                        </div>

                  </div>

                  <div className="group-post-user">

                        <div className="group-post-user-left">
                        <h2>{this.props.openPost.user.first_name}</h2>
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
      return {
          loggedUser:state.loggedUser,
          openPost:state.openPost,
          comments:state.comments
      }
}

var OpenPostContainer = connect(mapStateToProps)(OpenPost);

export default OpenPostContainer;
