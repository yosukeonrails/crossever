

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
import LogInWindowContainer  from './log-in-window.js'

var showSignIn= function(){

        $('.field-container').css('display' , 'block');
        $('.field-container').animate({opacity:'1'});

};

class DiagonalLine extends React.Component {
  render(){
    return(
            <div>
            <svg  style={{position:'absolute'}} width="100%"  height="100vh" viewBox="0 0 1021 495" version="1.1" >

            <title>Path 2</title>
            <desc>Created with Sketch.</desc>
            <defs></defs>
            <g id="Landing-Page-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(-3.000000, -66.000000)">
            <polyline id="Path-2" stroke="#929191" stroke-width="2" points="3.81008061 559.109683 643.898436 471.534727 1026.90787 64.627794"></polyline>
            </g>
            </svg>
            </div>
    )
  }
}

class HomeBubble extends React.Component{
  render(){

    return (

      <div style={{  zIndex:'3', backgroundImage: this.props.url , width:this.props.width , height:this.props.height , marginTop: this.props.marginTop}}  className="home-bubble">

      </div>

    )
  }
}


export class Home extends React.Component{

  constructor(props){
    super(props)
    this.showSignIn= this.showSignIn.bind(this);
  }

    showSignIn(){
        console.log(showSignIn)
      showSignIn();

    }
    render () {


      return(

        <div>
            <div className="home">

              <DiagonalLine/>


                              <div  style={{padding:'10%'}} className="home-content">


                                      <div className="log-in-window-container">
                                          <LogInWindowContainer/>
                                      </div>


                                              <div className="welcome-message">


                                              <h1>Making <br/> <span style={{color:'#4abbbd'}}> in-game built </span> <br/>  relationships <br/>  into <span style={{color:'#00b4ff'}}> real life </span> <br/  > relationships.</h1>
                                              <h1 style={{fontSize:'25px'}}> <span style= {{color: "#00b4ff"}}>Crossever </span> is a platform that   <br/> let’s you find gamers in your area <br/> who plays the same game as you.</h1>


                                              <div style={{width:'30%' , marginTop:'30px'}}>
                                              <button onClick={this.showSignIn} > Sign Up </button>
                                              <span >  <h1 style={{textAlign:'center'}}> or  </h1> </span>
                                              <button id="dark-home-button" onClick={this.showSignIn} >  Sign In </button>
                                              </div>


                                              </div>

                                              <div style={{width:'50%' , float:'left'}}>
                                              <HomeBubble width='300px' height='300px' marginTop="300px" url="url(https://source.unsplash.com/wuvr-X2Lt1U/1600x900)"/>
                                              </div>

                              </div>

            </div>
        </div>

    );
  }
}


  var mapStateToProps= function(state){

        return {
            loggedUser:state.loggedUser
        }
  }

   var HomeContainer = connect(mapStateToProps)(Home);

export default HomeContainer;
