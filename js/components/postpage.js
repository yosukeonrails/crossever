require('babel-polyfill');

var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Route = router.Route;
var Link = router.Link;
import OpenPostContainer from './openpost.js'
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


export class PostPage extends React.Component{

  constructor(props){

    super(props)

      this.likePost= this.likePost.bind(this);
      var dis= this;
      this.state =  {dataIsReady:false};
    
    
      
      this.props.dispatch(getPostByID(this.props.params.id)).then(function(data){
          console.log(data);          
          dis.props.dispatch(getCommentsByPostID(data.payload._id)).then(function(data){
            
                dis.setState({
                    dataIsReady:true,
                    openPage:data.payload
                }) 
                
          });

      })

    }

    likePost(data){
      console.log(data);
       this.props.dispatch(updatePost(data));
       this.setState({liked:true});
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

      comments=[];
      openPost=[];
      
      if(this.props.openPost !== null && this.state.dataIsReady === true ){
          console.log('re-rendered happened');
          console.log(this.state)
          console.log(this.props.openPost)
          openPost= <OpenPostContainer params={this.props.params.id}/>;
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
