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
import SelectedGamesContainer from './selected-games.js'
export class SetupStep3 extends React.Component{

  constructor(props){

    super(props)

    this.handleFormSubmit= this.handleFormSubmit.bind(this);
    this.handleInput= this.handleInput.bind(this);
    this.submitSearch= this.submitSearch.bind(this);
    this.hoverGame= this.hoverGame.bind(this);
    this.clearText= this.clearText.bind(this);

    this.props.blockSubmission(true);

  }

  clearText(){
      let textarea= this.refs.game_search_ref;
      textarea.value="";
      this.setState({input_cleared:true})
  }

  componentDidMount(){

    this.props.dispatch(getTopGames());
    this.setState({emptyString:true})
    this.setState({hoverClass:'game-image'})
  }

  submitSearch(){

      this.props.dispatch(searchGame(this.state.searchString));
      this.clearText();
  }

   handleInput(event){

        if(event.target.value.length === 0 || !event.target.value){  this.setState({emptyString:true}) } else { this.setState({emptyString:false} )}

        this.setState({searchString:event.target.value})
        this.props.dispatch(searchGame(event.target.value))

   }

   hoverGame(i){
        this.setState({hoverClass:'game-image select-game-hover'})
   }


  handleFormSubmit(event){
     event.preventDefault()
   }

    render () {

      console.log(this.props);
      //render top games if the search is empty

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

                    return(
                    <GameBubbleContainer name={game.name} selected={false} imageURL={imageURL} id={i} key={i} data={game}  />
                    )
              })
        }

      //  var warning = ''
    //    if(this.props.warning.length !== 0 ){ warning = <div className="step3-warning"> <h2>{this.props.warning}</h2>  </div>}

      return(

        <div className="setp3-container">


          <div className="step3-nav">
              <h1>What games do you play?</h1>
              <label>search :</label><input ref="game_search_ref" onChange={this.handleInput}></input> <button onClick={this.submitSearch}>find</button>
          </div>

            <div className="step3-result">
                {gameList}
            </div>

            <div className="step3-selection">
              <SelectedGamesContainer callback={this.props.blockSubmission} styles={ {bubbleLeft:"none"}, {bubbleImage:{width:"80px",height:"80px", marginTop:"10px"}} }/>
            </div>

        </div>

    );
  }
}




  var mapStateToProps= function(state){

        return {
            loggedUser:state.loggedUser,
            manuallyLogged:state.manuallyLogged,
            topGames:state.topGames,
            foundGames:state.foundGames,
            selectedGameDataArray:state.selectedGameDataArray,
        }

  }



var SetupStep3Container = connect(mapStateToProps)(SetupStep3);

export default SetupStep3Container;
