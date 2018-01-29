console.log('catch me if you can')

require('babel-polyfill');

var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Route = router.Route;
var Link = router.Link;
var gotAllGroups= false;
var gotAllCities= false;

var my_cities=[];
var my_groups=[];
//import messageIcon from '../assets.js'

import {getFacebookUser, getUserInformation,getGameCityById,getGameGroupById,getGameCityByUser,getGameGroupByUser} from '../actions'
import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'
import {connect} from 'react-redux';


import DashSearchContainer from './dashsearch.js'


export class UserDashboard extends React.Component{

  constructor(props){

    super(props)

      this.getGroupsAndCities= this.getGroupsAndCities.bind(this);

    }

    componentWillMount(){
        this.setState({got_groups:false});
        this.setState({got_cities:false});
        this.setState({got_Groups_and_Cities:false})
    }

    componentDidMount(){
        // if not manually logged

      }

      redirectToLogIn(){
           hashHistory.push('/loginpage')
      }


      getGroupsAndCities(){


        var dis= this



      if(this.state.got_Groups_and_Cities === false ){

            this.props.dispatch(getGameCityByUser(this.props.loggedUser.userID)).then(function(data){

            console.log(data)
             my_cities=data.payload
             gotAllCities = true

              //     if(data.payload[0].length === 0){  gotAllCities = false }

                   dis.checkStatus();
              })

            this.props.dispatch(getGameGroupByUser(this.props.loggedUser.userID)).then(function(data){

              my_groups=data.payload
              gotAllGroups = true

            //   if(data.payload[0].length === 0){  gotAllCities = false }

              dis.checkStatus();
            })

      }


      }

    checkStatus(){

            if(gotAllCities===true & gotAllGroups===true){
                this.setState({got_Groups_and_Cities:true })
            }

    }

    getLoggedUser(){
      console.log('getting logged User')

      var dis=this;
      this.props.dispatch(getFacebookUser()).then(function(data){

          console.log(data)

          if(data.error){
            hashHistory.push('/loginpage')
          }


      });
    }



    getUserInformation(){
      console.log('getting user info')
      var dis= this;
        this.props.dispatch(getUserInformation(dis.props.loggedUser.userID));

    }


    checkForUserInformation(){


      if(this.props.userInformation == undefined){
         this.redirectToSetup();
      } else {
         this.getGroupsAndCities();
      }



    }


    redirectToSetup(){
         hashHistory.push('/setup')
    }

    render () {

    var dis=this;


      if(this.props.loggedUser === null ){     console.log('logged user is null'); this.getLoggedUser(); } else {

        if(this.props.userInformation === null){   this.getUserInformation(); }

        else
          {   this.checkForUserInformation();  }  }


      var dashContainer=null;


       if(this.state.got_Groups_and_Cities===true){

          dashContainer=   <DashSearchContainer cities={my_cities} groups={my_groups}/>

       }


      return(

          <div className="dashboard-page">



            {dashContainer}

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