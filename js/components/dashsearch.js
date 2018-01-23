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
import GameCardContainer from './game-card.js'

export class DashSearch extends React.Component{

  constructor(props){

    super(props)

    }

    render () {

      var myCities= [];

      var cities= this.props.cities;

      console.log(cities)

      cities.map(function(city){

      console.log(city)

      myCities.push(<GameCardContainer data={city} />)

      })
      //  this.renderMyCities();


      return(

          <div className="dash-search">

          <div className="dash-search-top">
              <div className="dash-search-tag">     <img src="/assets/icons/gameicon.png" /><h1>Your Games</h1> </div>
            <div className="input-container"><input placeholder="Search" ></input><img src="/assets/icons/search.png"/> </div>
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
        }

  }

   var DashSearchContainer = connect(mapStateToProps)(DashSearch);

export default DashSearchContainer;
