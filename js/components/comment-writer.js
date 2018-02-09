

require('babel-polyfill');

var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Route = router.Route;
var Link = router.Link;

import {getFacebookUser, getUserInformation,postComment,getCommentsByPostID,updatePost,getPostByID} from '../actions'
import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'
import {connect} from 'react-redux';



export class CommentWriter extends React.Component{

  constructor(props){

    super(props)
    this.handleText= this.handleText.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
    }

    handleText(e){

        this.setState({
          message:e.target.value})

    }

    handleSubmit(){
      event.preventDefault();

      var dis=this;
      let textarea= this.refs.comment_text


      if(!this.props.loggedUser){

         return
      }

      let data={
          postID:this.props.openPost._id,
          message:this.state.message,
          user:this.props.loggedUser,
          likes:0,
          popularity:0,
          reply:[]
      }


      let postData= {};
      Object.assign(postData, this.props.openPost)
      Object.assign(postData, {postID:this.props.openPost._id})
      let comments= postData.comments;
      comments++
      Object.assign(postData,{comments:comments})

      this.props.dispatch(updatePost(postData)).then(function(){
            dis.props.dispatch(getPostByID(postData.postID)).then(function(data){
                  
            })
      })




      this.props.dispatch(postComment(data)).then(function(data){

            dis.props.dispatch(getCommentsByPostID(data.payload.postID)).then(function(data){

            });

      });

      textarea.value="";
    }


    render () {



      return(

          <div className="comment-writer">

          <div className="comment-writer-content">
                <textarea ref="comment_text" onChange={this.handleText}></textarea>
                <button onClick={this.handleSubmit}>Submit</button>
          </div>
          </div>

    );
  }
}


  var mapStateToProps= function(state){

        return {
            loggedUser:state.loggedUser,
            openPost:state.openPost
        }

  }

   var CommentWriterContainer = connect(mapStateToProps)(CommentWriter);

export default CommentWriterContainer;
