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

import {getFacebookUser, getUserInformation,getGameCityById,getGameGroupById} from '../actions'
import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'
import {connect} from 'react-redux';
import SideBarContainer from './sidebar.js';
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



      getGroupsAndCities(){


        var dis= this


        if(this.state.got_Groups_and_Cities === false ){

          var dis=this;
        console.log(this.props.userInformation);

        var memberOf= this.props.userInformation.details.memberOf;

                      memberOf.group.map(function(group,i){

                        dis.props.dispatch(getGameGroupById(group)).then(function(data){

                              my_groups.push(data.payload[0])


                              if(i === memberOf.group.length-1){
                                  console.log('got all groups')
                                  console.log(my_groups)
                                  gotAllGroups=true;
                                  dis.checkStatus();
                              }


                          })


                      })

                    memberOf.city.map(function(city,j){

                      dis.props.dispatch(getGameCityById(city)).then(function(data){

                            my_cities.push(data.payload[0])

                            if(j === memberOf.city.length-1){
                              console.log('got all cities')
                                  console.log(my_cities)
                                gotAllCities= true;
                                dis.checkStatus();
                            }
                        })
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
      this.props.dispatch(getFacebookUser());
    }



    getUserInformation(){
      console.log('getting user info')
      var dis= this;
        this.props.dispatch(getUserInformation(dis.props.loggedUser.facebookId));

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


      if(this.props.loggedUser === null ){   this.getLoggedUser(); } else {

        if(this.props.userInformation === null){   this.getUserInformation(); }

        else
          {   this.checkForUserInformation();  }  }


      var dashContainer=null;

       if(this.state.got_Groups_and_Cities===true){
          dashContainer=   <DashSearchContainer cities={my_cities} groups={my_groups}/>
       }


      return(

          <div className="dashboard-page">

            <SideBarContainer/>

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
