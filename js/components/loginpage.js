require('babel-polyfill');

var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var Link = router.Link;

//import BlueTriangle from './bluetriangle.svg';
import BlueTriangle from 'babel!svg-react!./bluetriangle.svg';
import LoadingContainer from './loading.js'
import {push} from 'react-router-redux';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
import LogInWindowContainer from './log-in-window.js';
import {LogInUser, changeDisplaySettings} from '../actions'
var displayNone= {display:'none'};
var displayHidden= {visibility:'hidden'}
var displayBlock= {display:'block'};
export class LogInPage extends React.Component {

   constructor(props){
       super(props)


       this.handleInput= this.handleInput.bind(this);
       this.submitLogin= this.submitLogin.bind(this);

       this.state= {username:'', password:'', password_input_error:{visibility:'hidden'}, username_input_error:{visibility:'hidden'}, unauth_input_error:{display:'none'}};
       var display={}
       Object.assign(display, this.props.display_settings);
       display.viewPort.marginLeft='0px'
       this.props.dispatch(changeDisplaySettings(display));

   }



   facebooklogin(){

      window.location.href='/auth/facebook';
      /*
      1. if facebook log in successful , redirect to user page
      2. if fail, sing up page*/
   }


   handleInput(e, key){

    //   dis.setState({unauth_input_error:displayNone});

      if(key==='username'){
        if(e.target.value.length===0){ this.setState({ username_input_error:displayBlock});} else { this.setState({ username_input_error:displayHidden}); }
       }


      if(key==='password'){
        if(e.target.value.length===0){ this.setState({ password_input_error:displayBlock});} else { this.setState({ password_input_error:displayHidden}); }
       }

      this.setState({ [key]:e.target.value })

   }

  submitLogin(){
    var dis=this;
    let formatIsValid= true;
    dis.setState({unauth_input_error:displayNone , username_input_error:displayHidden, password_input_error:displayHidden});

      if(this.state.username.length ===0 ){
          this.setState({username_input_error:displayBlock})
          formatIsValid = false;
      }
      if(this.state.password.length===0){
        this.setState({password_input_error:displayBlock})
        formatIsValid = false;
      }

      if(formatIsValid===false){ return } else { this.setState({password_input_error:displayHidden, username_input_error:displayHidden}) }

      this.props.dispatch(LogInUser(
        {username:this.state.username,
           password:this.state.password
         })).then(function(data,err){

           if(data.error){
              //dont redirect but instead show error message
              dis.setState({unauth_input_error:displayBlock})

              return
            }

            dis.setState({unauth_input_error:displayNone})
           dis.redirectToUserdashboard()
         })

  }

  redirectToUserdashboard(){
     hashHistory.push('/userdashboard')
  }

   render(){


      if(this.props.loggedUser){
        this.redirectToUserdashboard();
      }


     return(
        <div className="log-in-page">

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
                      <h2 id="login-error-message" style={this.state.unauth_input_error} >Invalid password or username.</h2>

                      <h1>Username</h1>
                      <input onChange={(event)=>{this.handleInput(event,'username')} } ></input>

                      <h2 id="login-error-message" style={this.state.username_input_error} >Please provide a username.</h2>

                      <h1>Password</h1>
                      <input onChange={(event)=>{this.handleInput(event,'password')} } type="password"></input>

                      <h2 id="login-error-message" style={this.state.password_input_error} >Please provide a password.</h2>
                </div>

            <button  onClick={this.submitLogin} id="done-login-button"> Done </button>


            </div>

        </div>

     )
   }
}


var mapStateToProps=function(state){

    return{
      loggedUser:state.loggedUser,
      display_settings:state.display_settings
    }
}

var LogInPageContainer =  connect(mapStateToProps)(LogInPage)

export default LogInPageContainer;
