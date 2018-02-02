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



export class Comments extends React.Component{

  constructor(props){

    super(props)

    }



    render () {

    console.log(this.props)
    var imageUrl=""
      if(this.props.data.user){

          imageUrl="/assets/icons/user.png";

          if(this.props.data.user.facebookId !== 'guest'){

                imageUrl= "https://graph.facebook.com/"+this.props.data.user.facebookId+"/picture?width=300&height=300";
          }


      }

      return(
      <div className="comments-container">

        <div className="comment-connector"></div>  <div className="comment-connector"></div>
            <div className="comments">
              <div className="comments-user-image">
                <h2>{this.props.data.user.first_name}</h2>
               <img src={imageUrl}></img>
               </div>

                    <div className="comment-text">
                    <p> {this.props.data.message}</p>
                    </div>

                <div className="bottom-comments"><h2>reply</h2><img src="/assets/icons/heart-icon.png"></img></div>
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

   var CommentsContainer = connect(mapStateToProps)(Comments);

export default CommentsContainer;
