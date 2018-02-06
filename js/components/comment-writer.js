

require('babel-polyfill');

var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Route = router.Route;
var Link = router.Link;

import {getFacebookUser, getUserInformation,postComment,getCommentsByPostID} from '../actions'
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
      var dis=this;


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

      this.props.dispatch(postComment(data)).then(function(data){

            dis.props.dispatch(getCommentsByPostID(data.payload.postID)).then(function(data){

            });

      });

    }


    render () {



      return(

          <div className="comment-writer">

          <div className="comment-writer-content">
                <textarea onChange={this.handleText}></textarea>
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
