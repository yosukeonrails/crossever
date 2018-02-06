  require('babel-polyfill');

var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var Link = router.Link;
var pinkBorder= '1px solid #ff6b6b'
var haveSubmitted= false;
//import BlueTriangle from './bluetriangle.svg';
import BlueTriangle from 'babel!svg-react!./bluetriangle.svg';

import {push} from 'react-router-redux';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
import LogInWindowContainer from './log-in-window.js';
import {LogInUser, changeDisplaySettings,createOneUser} from '../actions'


export class SignUp extends React.Component {

   constructor(props){
       super(props)


      // this.submitSignUp= this.submitSignUp.bind(this);
       this.handleInput= this.handleInput.bind(this);
       this.submitSignUp= this.submitSignUp.bind(this);

       var display={}
       Object.assign(display, this.props.display_settings);
       display.viewPort.marginLeft='0px'
       this.props.dispatch(changeDisplaySettings(display));


   }

   componentWillMount(){

     this.setState({

          password:{input:'', border:null, error:'Password must be at least 7 characters long.', showError:'none'},
          password_confirmation:{input:'',border:null, error:'Password and the confirmation does not match', showError:'none'},
          username:{input:'',border:null, error:'Username must be at least 5 characters long.', showError:'none'},
          first_name:{input:'',border:null},
          last_name:{input:'',border:null}

     })

   }


   facebooklogin(){

      window.location.href='/auth/facebook';
      /*
      1. if facebook log in successful , redirect to user page
      2. if fail, sing up page*/
   }

    handleInput(k,e){

      var dis=this;

      var username = this.state.username
      var password = this.state.password;
      var confirmation = this.state.password_confirmation;

      let stt= this.state[k]
      Object.assign(stt,{input:e.target.value, border:null, showError:'none'});
      let obj={}
      obj[k]=stt;
      this.setState(obj)


      if(haveSubmitted === true){

        if(username.input.length < 4){
          Object.assign( username, {showError:'block', border:pinkBorder})
          let obj={};
          obj.username = username;
          dis.setState(obj);

        };

        if(password.input.length < 7){
          Object.assign( password, {showError:'block', border:pinkBorder});
           let obj={};
           obj.password = password;
           dis.setState(obj);
         };

      }

      //// after user had written the username , wait for a bit then see if the user already exists
      // if it does change the error message;


    }


  submitSignUp(){

   // Checking for missing fields

   haveSubmitted= true;

   var dis=this;

   var stt=this.state;

   var submissionStatus={
       missingFields:false,
       wrongField: false,
       unconfirmed_password:false
   };


   for(var key in stt){

      if( stt[key].input.length === 0 ){

             let stt=this.state[key];
             Object.assign(stt,{input:'', border:pinkBorder});
             let obj={};
             obj[key]=stt ;
             dis.setState(obj);

           submissionStatus.missingFields=true;
      }
   }


// check for fields with wrong format

  var username = this.state.username
  var password = this.state.password;
  var confirmation = this.state.password_confirmation;


  if(username.input.length < 4){
    Object.assign( username, {showError:'block', border:pinkBorder})
    let obj={};
    obj.username = username;
    dis.setState(obj);
    submissionStatus.wrongField= true;
  };

  if(password.input.length < 7){
    Object.assign( password, {showError:'block', border:pinkBorder});
     let obj={};
     obj.password = password;
     dis.setState(obj);
     submissionStatus.wrongField= true;
   };

// check if password is ==== confirmation

   if(password.input !== confirmation.input  ){

     Object.assign( confirmation, {showError:'block', border:pinkBorder})
     let obj={};
     obj.password_confirmation = confirmation;
     dis.setState(obj);
     submissionStatus.unconfirmed_password=true;

   }

    for(status in submissionStatus ){
            if(submissionStatus[status] === true ){

                  return
            }
    }

    let userData= {
        username:this.state.username.input,
        password:this.state.password.input,
        first_name:this.state.first_name.input,
        last_name:this.state.last_name.input,
        userID:this.state.username.input,
        facebookId:'guest'
    }

    var logInData= {
      username:this.state.username.input,
      password:this.state.password.input
    }

     dis.props.dispatch(createOneUser(userData)).then(function(data){

        dis.props.dispatch(LogInUser(

        {username:logInData.username,
        password:logInData.password

        })).then(function(){

        dis.redirectToUserdashboard()

        })

     });

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

            <div className="sign-up-box">

                <div className="signup-top">
                <h1>Sign Up</h1>
                <button id="facebook-signup-button" style={{top:'135px'}} onClick={this.facebooklogin}> Facebook Sign Up </button>
                </div>

                  <div className="log-in-top-middle">
                  <h1 style={{top:'155px'}} id="or">or</h1>
                  <hr style={{width: "30%", marginTop: "40px", float:"left"}}/>
                  <hr style={{width: "30%", marginTop: "40px" , float:"right"}} />
                  </div>

                <div className="sign-up-credentials">

                  <div className="signup-credential-container">
                  <h1>Username</h1>
                  <input style={{border:this.state.username.border}} onChange={ (event)=>{this.handleInput('username', event)} }></input>
                  <h2 id="sign-up-error-message" style={{display:this.state.username.showError}}> {this.state.username.error}</h2>

                  <h1>First Name</h1>
                  <input style={{border:this.state.first_name.border}} onChange={ (event)=>{this.handleInput('first_name', event)} }></input>


                  <h1>Last Name</h1>
                  <input style={{border:this.state.last_name.border}} onChange={ (event)=>{this.handleInput('last_name', event)} }></input>


                  </div>

                  <div className="signup-credential-container">

                  <h1>Password</h1>
                  <input style={{border:this.state.password.border}} onChange={ (event)=>{ this.handleInput('password', event)} } type="password"></input>
                  <h2 id="sign-up-error-message" style={{display:this.state.password.showError}}> {this.state.password.error}</h2>

                  <h1>Confirm Password</h1>
                  <input style={{border:this.state.password_confirmation.border}} onChange={ (event)=>{this.handleInput('password_confirmation', event)} } type="password"></input>
                  <h2 id="sign-up-error-message" style={{display:this.state.password_confirmation.showError}}> {this.state.password_confirmation.error}</h2>

                  </div>



                </div>

            <button style={{ top:'75%', position:'relative'}} onClick={this.submitSignUp} id="done-login-button"> Done </button>


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

var SignUpContainer =  connect(mapStateToProps)(SignUp)

export default SignUpContainer;
