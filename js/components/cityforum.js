console.log('catch me if you can')

require('babel-polyfill');

var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Route = router.Route;
var Link = router.Link;

import {getFacebookUser,changeDisplaySettings, getUserInformation} from '../actions'
import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'
import {connect} from 'react-redux';



export class CityForum extends React.Component{

  constructor(props){
  super(props)
  
  var display={}
  Object.assign(display, this.props.display_settings);
  display.sidebar.display='block'
  this.props.dispatch(changeDisplaySettings(display));


    }

    render () {

      return(

          <div className="dashboard-page">
             <h1> CITY FORUM </h1>
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

   var CityForumContainer = connect(mapStateToProps)(CityForum);

export default CityForumContainer;
