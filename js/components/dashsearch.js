console.log('catch me if you can')

require('babel-polyfill');

var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Route = router.Route;
var Link = router.Link;

import {getFacebookUser, getUserInformation,changeDisplaySettings,setUpInformation,addToGameIdList, addToSelectedGame} from '../actions'
import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'
import {connect} from 'react-redux';
import GameCardContainer from './game-card.js'

export class DashSearch extends React.Component{

  constructor(props){

    super(props)

    this.addMoreGames = this.addMoreGames.bind(this);
    this.handleInput = this.handleInput.bind(this);
    var display= {}

    Object.assign(display, this.props.display_settings);
    display.sidebar.display='block';
    this.props.dispatch(changeDisplaySettings(display));

        this.state={
          emptyString:true
        }

    }

    handleInput(e){

    let string= e.target.value;
    let games= [];

    if(string.length === 0){

        this.setState({
          emptyString:true
        })

    }

    if(string.length > 0){

        this.props.cities.map(function(game){

          let gameName= game.name.toLowerCase();

            if(gameName.indexOf(string)!== -1){

                games.push(game);
            }

        })

        this.setState({
          emptyString:false,
          filteredCities:games
        })
    }


    }

    addMoreGames(){

        this.props.dispatch(setUpInformation(null));
      this.props.dispatch(addToSelectedGame([]));
      this.props.dispatch(addToGameIdList([]));

        hashHistory.push('/moregames/'+this.props.loggedUser.userID)
    }


    render () {

      var myCities= [];
      var cities;


      console.log(cities)

      if(this.state.emptyString === true){

        cities=this.props.cities;
        cities.map(function(city){
                console.log(city);

                myCities.push(<GameCardContainer data={city} />)
        })
      }

      if(this.state.emptyString === false){

        cities=this.state.filteredCities;

        cities.map(function(city){
                console.log(city);

                myCities.push(<GameCardContainer data={city} />)
        })

      }




      //  this.renderMyCities();


      return(

          <div className="dash-search">

          <div className="dash-search-top">
              <div className="dash-search-tag">     <img src="/assets/icons/gameicon.png" /><h1>Your Games</h1> </div>
                <div className="input-container"><input  onChange={this.handleInput} placeholder="Search" ></input><img src="/assets/icons/search.png"/>
                <button onClick={this.addMoreGames}>Add More Games</button>
                </div>
          </div>



            <div className="dash-results">

                {myCities}

            </div>

          </div>

    );
  }
}


  var mapStateToProps= function(state){
        console.log(state);

        return {
            loggedUser:state.loggedUser,
            display_settings:state.display_settings
        }

  }

   var DashSearchContainer = connect(mapStateToProps)(DashSearch);

export default DashSearchContainer;
