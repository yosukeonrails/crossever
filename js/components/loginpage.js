require('babel-polyfill');

var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var Link = router.Link;

//import BlueTriangle from './bluetriangle.svg';
import {push} from 'react-router-redux';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
import LogInWindowContainer  from './log-in-window.js';



export class LogInPage extends React.Component {

   constructor(props){
       super(props)
   }

   facebooklogin(){
     console.log('login in ');

      window.location.href='/auth/facebook';
      /*
      1. if facebook log in successful , redirect to user page
      2. if fail, sing up page*/
   }

   render(){
     return(
        <div>

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
                      <input></input>

                      <h1>Password</h1>
                      <input></input>

                </div>

            <button id="done-login-button"> Done </button>


            </div>

        </div>

     )
   }
}

export default LogInPage;
