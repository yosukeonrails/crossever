console.log('catch me if you can')

require('babel-polyfill');

var React = require('react');
var ReactDOM = require('react-dom');

var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var Link = router.Link;

import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'
import {connect} from 'react-redux';
import {getTopGames,searchGame} from '../actions/index.js'


export class GameBubble extends React.Component{

  constructor(props){

    super(props)

    this.handleFormSubmit= this.handleFormSubmit.bind(this);
    this.submitSearch= this.submitSearch.bind(this);
    this.hoverGame= this.hoverGame.bind(this);

  }

  componentWillMount(){
    this.setState({ hoverStyle:' '  })
  }
  submitSearch(){
    console.log(this.state.searchString);
      this.props.dispatch(searchGame(this.state.searchString))
  }


   hoverGame(action){

     if(action==='in'){
         this.setState({hoverStyle:' select-game-hover '})
     } else {
        this.setState({hoverStyle:' '})
     }
    


   }


  handleFormSubmit(event){
     event.preventDefault()


   }

    render () {

      var hoverStyle='';

      return(

        <div className="game-container" >

          <div className={'game-image '+this.state.hoverStyle} key={this.props.key}  style={{backgroundImage:this.props.imageURL}}  onMouseOut={()=> this.hoverGame('out')}  onMouseOver={()=> this.hoverGame('in')} >
          </div>

            {this.props.name}
        </div>


    );
  }
}




  var mapStateToProps= function(state){

        return {
            loggedUser:state.loggedUser

        }

  }



var GameBubbleContainer = connect(mapStateToProps)(GameBubble);

export default GameBubbleContainer;
