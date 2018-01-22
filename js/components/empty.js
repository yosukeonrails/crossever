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



export class Empty extends React.Component{

  constructor(props){

    super(props)

    }



    render () {



      return(

          <div className="dashboard-page">
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

   var EmptyContainer = connect(mapStateToProps)(Empty);

export default EmptyContainer;
