require('babel-polyfill');

var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var Link = router.Link;

//import BlueTriangle from './bluetriangle.svg';
import BlueTriangle from 'babel!svg-react!./bluetriangle.svg';

import {push} from 'react-router-redux';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
import LogInWindowContainer from './log-in-window.js';
import {LogInUser} from '../actions'


export class LogInPage extends React.Component {

   constructor(props){
       super(props)

       this.handleUsername= this.handleUsername.bind(this);
       this.handlePassword= this.handlePassword.bind(this);
       this.submitLogin= this.submitLogin.bind(this);
   }

   facebooklogin(){
     console.log('login in ');

      window.location.href='/auth/facebook';
      /*
      1. if facebook log in successful , redirect to user page
      2. if fail, sing up page*/
   }


   handleUsername(e){
       console.log(e.target.value)

      this.setState({
        username:e.target.value
      })

   }
   handlePassword(e){

     this.setState({
       password:e.target.value
     })

   }

  submitLogin(){

      console.log(this.state);
      this.props.dispatch(LogInUser(
        {username:this.state.username,
           password:this.state.password
         }))

  }

  redirectToUserdashboard(){
     hashHistory.push('/userdashboard')
  }

   render(){


      if(this.props.loggedUser){
        this.redirectToUserdashboard();
      }


     return(
        <div>
            <div style={{position:'absolute', width:"100%"}} >
              <BlueTriangle/>
            </div>

            <div className="log-in-box">

                <div className="log-in-top">
                <h1>Sign In</h1>
                <button id="facebook-login-button" onClick={this.facebooklogin}> Facebook Sign In </button>
                </div>

                  <div className="log-in-top-middle">
                  <h1 id="or">or</h1>
                  <hr style={{width: "30%", marginTop: "40px", float:"left"}}/>
                  <hr style={{width: "30%", marginTop: "40px" , float:"right"}} />
                  </div>

                <div className="sign-in-credentials">

                      <h1>Username</h1>
                      <input onChange={this.handleUsername}></input>

                      <h1>Password</h1>
                      <input onChange={this.handlePassword} type="password"></input>

                </div>

            <button  onClick={this.submitLogin} id="done-login-button"> Done </button>


            </div>

        </div>

     )
   }
}


var mapStateToProps=function(state){
    return{
      loggedUser:state.loggedUser
    }
}

var LogInPageContainer =  connect(mapStateToProps)(LogInPage)

export default LogInPageContainer;
