console.log('catch me if you can')

require('babel-polyfill');

var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Route = router.Route;
var Link = router.Link;
import SetupStep2Container from './step2';
import SetupStep3Container from './step3';
import SetupStep4Container from './step4';
import {getFacebookUser, getUserInformation, createUserInformation} from '../actions'
import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'
import {connect} from 'react-redux';

//dv for default values''
var dv= {
  username:null,
}


export class StepOne extends React.Component{

   render(){

         return(
             <div>
                 <div className="step1-container"><h1> Hello , {dv.username}  </h1> <h1> Welcome to CrossEver!</h1><h2></h2></div>

             </div>
         )

   }
}

export class SetUp extends React.Component{

  constructor(props){

      super(props)
      this.nextStep= this.nextStep.bind(this);
    }
    componentWillMount(){
        this.props.dispatch(getFacebookUser())

        this.setState({step:0})

    }


    getUser(){

          if(this.props.loggedUser){

           var loggedUser= this.props.loggedUser;
           dv.username= loggedUser.first_name

            }

    }

    nextStep(){


      if(this.state.step=== 3 ){

            hashHistory.push('/userdashboard')

         }

      this.setState({step:this.state.step+1})
      // once set up begins and there is data to bind to userInfo
      if(this.state.step === 0){

        this.props.dispatch(createUserInformation({
              username:dv.username,
              userID:this.props.loggedUser.userID,
              details:null
        }))
      }

      if(this.props.setUpInformation ){

          var userInfo= this.props.userInformation;
          var data= this.props.setUpInformation;

          Object.assign(userInfo, {details:data} );

          this.props.dispatch(createUserInformation(userInfo));

      }



    }



    render () {

      this.getUser();


      var stepsArray=[<StepOne username={dv.username} />,<SetupStep2Container/>,<SetupStep3Container/>,<SetupStep4Container/>]

      return(
        <div className="setup-window">
            {stepsArray[this.state.step]}
            <button onClick={this.nextStep}> Next </button>
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
            setUpInformation:state.setUpInformation,
            userInformation:state.userInformation
        }

  }

   var SetUpContainer = connect(mapStateToProps)(SetUp);

export default SetUpContainer;
