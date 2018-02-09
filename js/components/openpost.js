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

var display={
  option_menu:'none',
  delete_background:'none'
}


export class OpenPost extends React.Component{


    constructor(props){
      super(props)

      this.checkUserType = this.checkUserType.bind(this);
      this.likePost= this.likePost.bind(this);


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

      componentWillMount(){

        this.setState({
           display:display
        });

      }

      likePost(){

        let data= {};
        var dis= this;

       // needs to take current information from database //
       this.props.dispatch(getPostByID(this.props.openPost._id)).then(function(res){


          let data= res.payload;

          Object.assign(data, {postID: dis.props.openPost._id} )

          let index=  data.likedBy.indexOf(dis.props.loggedUser.userID);

          if(index!==-1){

          data.likedBy.splice(index, 1);

          dis.props.dispatch(updatePost(data));
          dis.setState({heartStyle:'brightness(170%)'});

          } else {

          data.likedBy.push(dis.props.loggedUser.userID);

          dis.props.dispatch(updatePost(data));
          dis.setState({heartStyle:'none'});
          }

       })



      }

      toggleStyle(key,specific){

        if(this.state.display[key] === 'block'){
              display[key] = 'none';
         } else {
               display[key] = 'block';
         }

         if(specific){
            display[key] = specific;
         }

          this.setState({
            display:display
          })

      }



      authenticatePostOwner(){
        let result='none';

          if(this.props.loggedUser.userID === this.props.openPost.user.userID){
                result="block";
          }

        return result
      }

      checkUserType(){

            if(this.props.openPost.user.facebookId !== 'guest'){
               imageUrl ='url(https://graph.facebook.com/'+this.props.openPost.user.userID+'/picture?width=300&height=300)'
            } else {
               imageUrl= 'url(/assets/icons/user.png)'
            }


      }


      render () {

   var showOptions=this.authenticatePostOwner();


    this.checkUserType()

        return(

          <div className="group-post">

          <div style={{display:display.delete_background}}  className="post-delete-warning">
            <div className="warning-delete-message">
            <h1> Are you sure you want to delete this post?</h1>
              <button style={{backgroundColor:"#4fa546"}}> Cancel </button>  <button style={{backgroundColor:"#fb6060"}} > Delete</button>
            </div>

          </div>

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

                      <div style={{display:showOptions}} onClick={() => this.toggleStyle("option_menu")}  className="user-option-icon"><img src="/assets/icons/settingswhite.png"></img></div>

                            <div style={{display:display.option_menu}}  onMouseLeave={()=>{ this.toggleStyle("option_menu","none") }}  className="user-options">
                              <ul>
                                  <li  onClick={()=>{ this.toggleStyle("option_menu","none")  }}>edit</li>
                                  <li  onClick={()=>{ this.toggleStyle("delete_background","block")  }}>delete</li>
                              </ul>
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
