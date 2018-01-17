

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





class Connectors extends React.Component {
  render(){
    return(
      <div   style={{position:'absolute', marginTop:'500px' }}>
      <svg width="894px" height="349px" viewBox="0 0 894 349" version="1.1" >
          <title>Path 5</title>
          <desc>Created with Sketch.</desc>
          <defs></defs>
          <g id="Landing-Page-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(-2.000000, -456.000000)">
              <polyline id="Path-5" stroke="#979797" stroke-width="3" points="3.46320526 792.970096 293.724074 674.412528 601.771531 802.601422 893.198492 752.540666 792.124917 457.076667"></polyline>
          </g>
      </svg>
      </div>

    )
  }
}

class DiagonalLine extends React.Component {
  render(){
    return(
            <div>
                  <svg style={{position:'absolute' , top:'-155px'}} width="100%"  height="200vh" viewBox="0 0 1026 645" version="1.1">

                  <desc>Created with Sketch.</desc>
                  <defs></defs>
                  <g id="Crossever" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <path d="M762.869371,242.165916 L876.172146,495.510391 L606.465487,559.911122 L240.888384,420.592694 L130.522978,644.991528 M0.437339847,290.82441 L751.710317,242.586595 L1025.05548,1.13920631" id="horizontalBend" stroke="#979797"></path>
                  </g>
                  </svg>
            </div>
    )
  }
}

class HomeBubble extends React.Component{
  render(){

    return (

      <div style={{  zIndex:'3', backgroundImage: this.props.url , width:this.props.width , height:this.props.height , marginTop: this.props.marginTop ,left: this.props.left}}  className="home-bubble">

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
        <DiagonalLine/>
        <HomeBubble width='300px' height='300px' marginTop="300px" left="60%" url="url(https://source.unsplash.com/wuvr-X2Lt1U/1600x900)"/>


            <div className="home" >

                              <div className="home-content"  style={{paddingLeft:'10%' , paddingTop:'50px'}} >


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
