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

var gray='grayscale(100%)'
var normal='none'
var topicArray=["team","events","general"]

var selectedTopic={
color:'#ffffff',
backgroundColor:'rgb(43, 166, 103)',
borderRadius:'6px',
paddingTop:'2px' ,
paddingBottom:'2px',
}

export class PostCreator extends React.Component{

  constructor(props){

    super(props)

    this.selectTopic= this.selectTopic.bind(this);

  }

  componentWillMount(){

      this.setState({
              team:{color:normal, tagColor:null},
              events:{color:normal, tagColor:null},
              general:{color:normal, tagColor:null}
      })
  }

    selectTopic(e){

      let defaultStyle={
        team:{color:gray, tagColor:null},
        events:{color:gray, tagColor:null},
        general:{color:gray, tagColor:null}
      }

        defaultStyle[e.target.id].color=normal;
        defaultStyle[e.target.id].tagColor= selectedTopic;

        this.setState(defaultStyle);

    }


    render () {

      var imageUrl= 'url('+this.props.group.gameData.box.medium+')';
      return(

          <div className="post-creator-container">

            <div className="post-creator">

              <div className="post-creator-group" >
                  <div id="group-image"style={{backgroundImage:imageUrl}}></div>
                  <h1>{this.props.group.name}</h1>
                </div>

                <h1>Topic</h1>
                  <div className="post-topic">
                      <div id="topic-image"><img  onClick={this.selectTopic} style={{filter:this.state.team.color}}  id="team" src="/assets/icons/teamrequest.png"/><h2 style={this.state.team.tagColor} >Team Request</h2></div>
                        <div id="topic-image"><img  onClick={this.selectTopic} style={{filter:this.state.events.color}} id="events" src="/assets/icons/events.png"/><h2 style={this.state.events.tagColor} >Events</h2></div>
                          <div id="topic-image"><img   onClick={this.selectTopic}  style={{filter:this.state.general.color}} id="general" src="/assets/icons/discussion.png"/><h2 style={this.state.general.tagColor} >General</h2></div>
                  </div>

                  <div className="post-creator-title">
                    <h1>Title</h1>
                    <input></input>
                  </div>

                  <div className="post-creator-message">
                    <h1>Text</h1>
                    <textarea rows="20" cols="50" id="TITLE"></textarea>
                  </div>

                      <div className="button-container">
                      <button id="cancel">Cancel</button>
                      <button id="submit">Submit</button>
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

   var PostCreatorContainer = connect(mapStateToProps)(PostCreator);

export default PostCreatorContainer;
