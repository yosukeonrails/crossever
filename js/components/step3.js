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
import GameBubbleContainer from './game-bubble.js'

export class SetupStep3 extends React.Component{

  constructor(props){

    super(props)

    this.handleFormSubmit= this.handleFormSubmit.bind(this);
    this.handleInput= this.handleInput.bind(this);
    this.submitSearch= this.submitSearch.bind(this);
    this.hoverGame= this.hoverGame.bind(this);

  }

componentDidMount(){

    this.props.dispatch(getTopGames());
  this.setState({emptyString:true})
this.setState({hoverClass:'game-image'})
  }

  submitSearch(){
    console.log(this.state.searchString);
      this.props.dispatch(searchGame(this.state.searchString))
  }

   handleInput(event){

        console.log(event.target.value)

        if(event.target.value.length === 0 || ! event.target.value){

            this.setState({emptyString:true})

        } else {this.setState({emptyString:false})}


        this.setState({searchString:event.target.value})

          this.props.dispatch(searchGame(event.target.value))

   }

   hoverGame(i){
      console.log(i)
        this.setState({hoverClass:'game-image select-game-hover'})

   }


  handleFormSubmit(event){
     event.preventDefault()


   }

    render () {


      if(this.props.topGames && this.state.emptyString === true){

        var dis= this;
        var gameList= this.props.topGames.map(function(game, i){
          var hoverStyle=''


                // if found inside selectedData with same id , then seleted === false
                var selected= false;
                var imageURL= 'url('+game.game.box.large+')';

                  return(
                      <GameBubbleContainer name={game.game.name} selected={false} imageURL={imageURL} id={i} key={i} data={game.game} />
                  )
            })
      }



        if(this.props.foundGames && this.state.emptyString === false){

          var gameList= this.props.foundGames.map(function(game, i ){

                  var imageURL= 'url('+game.box.large+')';
                  var selected= false;
                  console.log(game)
                    return(
                    <GameBubbleContainer name={game.name} selected={false} imageURL={imageURL} id={i} key={i} data={game}  />
                    )
              })
        }






      return(

        <div className="setp3-container">


          <div className="step3-nav">
              <h1>What games do you play?</h1>
            <label>search :</label><input onChange={this.handleInput}></input> <button onClick={this.submitSearch}>find</button>
          </div>

            <div className="step3-result">
                {gameList}
            </div>

            <div className="step3-selection">

            </div>

        </div>

    );
  }
}




  var mapStateToProps= function(state){
    console.log(state)

        return {
            loggedUser:state.loggedUser,
            manuallyLogged:state.manuallyLogged,
            topGames:state.topGames,
            foundGames:state.foundGames

        }

  }



var SetupStep3Container = connect(mapStateToProps)(SetupStep3);

export default SetupStep3Container;
