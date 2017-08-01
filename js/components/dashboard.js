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
import SetupStep2Container from './step2.js'
import SetupStep3Container from './step3.js'
import {getFacebookUser, getTopGames} from '../actions/index.js'
var loggedUser;


export class Dashboard extends React.Component{

  constructor(props){


    super(props)
      this.nextStep= this.nextStep.bind(this);

    if(this.props.manuallyLogged !== true){ this.props.dispatch(getFacebookUser()); }

  }

  componentWillMount(){
     this.setState({step:0})
    }

    nextStep(){

        if(this.state.step=== 3){ return; }
        console.log('next step')

        var currentStep= this.state.step;
        this.setState({step:currentStep+1})

    }

    render () {





        var setUpMessage= "Let'get you all set up. We just need to ask you a few questions!"

        var username="";

        if(this.props.loggedUser){

        username= this.props.loggedUser.first_name;

        }



        var step1= (  <div>   <h1> Hello , {username}  </h1> <h1> Welcome to CrossEver!</h1><h2>{setUpMessage}</h2></div>)
        var step2= (<SetupStep2Container/>)
        var step3= (<SetupStep3Container/>)
        var stepArray=[step1, step2, step3 ];

        console.log(stepArray)

      return(

          <div className="dashboard-page">

                  <div className="setup-window">

                            <div className="setup-content">

                                      {stepArray[this.state.step]}

                                      <button  onClick={this.nextStep}>next</button>

                            </div>
                  </div>

          </div>

    );
  }
}


  var mapStateToProps= function(state){
        console.log(state);

        return {
            loggedUser:state.loggedUser,
            manuallyLogged:state.manuallyLogged,
            topGames:state.topGames
        }

  }

   var DashboardContainer = connect(mapStateToProps)(Dashboard);

export default DashboardContainer;