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
                        console.log(dis.props.userInformation.userID)

                          if(dis.props.userInformation.userID === dis.props.loggedUser.facebookId){
                                console.log('we found userInfo')
                           }
                   })
                }

            })

      }


    redirectToSetup(){
         hashHistory.push('/setup')
    }

    render () {

        this.redirectToSetup();

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
            manuallyLogged:state.manuallyLogged,
            topGames:state.topGames,
            selectedGameDataArray: state.selectedGameDataArray,
            userInformation:state.userInformation
        }

  }

   var UserDashboardContainer = connect(mapStateToProps)(UserDashboard);

export default UserDashboardContainer;
