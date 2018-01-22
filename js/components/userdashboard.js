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

import SideBarContainer from './sidebar.js'

export class UserDashboard extends React.Component{

  constructor(props){

    super(props)

    }

    componentDidMount(){
        // if not manually logged
      var dis=this;
            this.props.dispatch(getFacebookUser()).then(function(data){

                if(dis.props.loggedUser){
                   dis.props.dispatch(getUserInformation(dis.props.loggedUser.facebookId)).then(function(data){


                   })
                }

            })

      }

    checkForUserInformation(){

      if(this.props.loggedUser){
          if(this.props.userInformation){
            if(this.props.userInformation.length === 0 ){
                  this.redirectToSetup();
            }
          }
      }


    }


    redirectToSetup(){
         hashHistory.push('/setup')
    }

    render () {


      this.checkForUserInformation();


      return(

          <div className="dashboard-page">

              <SideBarContainer/>

          </div>

    );
  }
}


  var mapStateToProps= function(state){
        console.log(state);

        return {
            loggedUser:state.loggedUser,
            manuallyLogged:state.manuallyLogged,
            topGames:state.topGames,
            selectedGameDataArray: state.selectedGameDataArray,
            userInformation:state.userInformation
        }

  }

   var UserDashboardContainer = connect(mapStateToProps)(UserDashboard);

export default UserDashboardContainer;
