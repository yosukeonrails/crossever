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

      if(this.props.data.likedBy.includes(this.props.user.userID)){
          console.log('contains the user make the heart red');
          this.state={
              heartStyle:'none'
          }
      } else{
        this.state={
            heartStyle:'brightness(175%)'
        }
      }

      }

      likePost(){

        let data= {};



        console.log(this.props.data);

        Object.assign(data, this.props.data);
        Object.assign(data, {postID: this.props.data._id} )
        let index=  data.likedBy.indexOf(this.props.user.userID);

        if(index!==-1){
          data.likedBy.splice(index, 1);

          this.setState({
              heartStyle:'brightness(175%)'
          })
        } else {
          data.likedBy.push(this.props.user.userID);

          this.setState({
              heartStyle:'none'
          })
        }

          this.props.likePost(data);


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
                          <div id="post-bottom-icon">< img onClick={this.likePost} style={{ filter:this.state.heartStyle }} src="/assets/icons/heart-icon.png"></img><h2>{this.props.data.likedBy.length}</h2><h3>likes</h3></div>
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

      this.likePost= this.likePost.bind(this);
      var dis= this;
      this.props.dispatch(getPostByID(this.props.params.id)).then(function(data){

          dis.props.dispatch(getCommentsByPostID(data.payload._id)).then(function(data){

          });

      })

    }

    likePost(data){
      console.log(data);
       this.props.dispatch(updatePost(data));
    }

    getPostByID(){

    }

    renderComments(){
        comments=[];
        this.props.comments.map(function(comment){

            comments.push(  <CommentsContainer data={comment}/>)

        })
    }

    render () {

      if(this.props.openPost !== null){
          openPost= <OpenPost data={this.props.openPost} user={this.props.loggedUser} likePost={this.likePost}/>;
      }

      if(this.props.comments.length > 0){
          this.renderComments();
      }

      return(

          <div className="open-post">

       <div className="post-section">
                  {openPost}
      </div>


        <div className="comments-section">
              {comments}
        </div>

        <div className="comment-writer-section">
              <CommentWriter/>
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

   var PostPageContainer = connect(mapStateToProps)(PostPage);

export default PostPageContainer;
