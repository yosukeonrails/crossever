

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
import {changeDisplaySettings} from '../actions';
import FooterComponent from './footer.js'
//
// var showSignIn= function(){
//
//         $('.field-container').css('display' , 'block');
//         $('.field-container').animate({opacity:'1'});
//
// };

var bubbleDimensions;


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

      <div style={{  backgroundImage: this.props.url , width:this.props.width , height:this.props.width , marginTop: this.props.marginTop ,left: this.props.left}}  className="home-bubble">

      </div>

    )
  }
}


export class Home extends React.Component{

  constructor(props){

      super(props)

      //  this.showSignIn= this.showSignIn.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);

        var display={};

        Object.assign(display, this.props.display_settings);
        display.sidebar.display='none'
        display.viewPort.marginLeft='0px'
        this.props.dispatch(changeDisplaySettings(display));

        this.state = {
         height: window.innerHeight,
         width: window.innerWidth
       };
   }

    componentDidMount(){
         this.setState({originWidth:$(window).width()})
         window.addEventListener("resize", this.updateDimensions);
    }



    updateDimensions() {

            this.setState({
              height: window.innerHeight,
              width: window.innerWidth
            });
      }


    goToSignIn(){
            hashHistory.push('/signup')
    }

    goTologIn(){
      hashHistory.push('/loginpage')
    }


    render () {

      var widthSubstraction=0;

        if(this.state.width < 1200 ){
            widthSubstraction = (1200 - this.state.width)/5;
        }

        bubbleDimensions = [{d:30},{d:10},{d:10},{d:10}]

      return(

        <div>
            <div className="home" >

                            <div className="home-content" >

                                            <div className="home-top">

                                                          <div className="welcome-message">
                                                                  <h1>Making <br/> <span style={{color:'#4abbbd'}}> in-game built </span> <br/>  relationships <br/>  into <span style={{color:'#00b4ff'}}> real life </span> <br/  > relationships.</h1>
                                                                  <h1 style={{fontSize:'25px'}}> <span style= {{color: "#00b4ff"}}>Crossever </span> is a platform that   <br/> let’s you find gamers in your area <br/> who plays the same game as you.</h1>


                                                                  <div style={{width:'30%' , marginTop:'30px'}}>

                                                                  <button style={{zIndex:'2'}} onClick={this.goToSignIn} > Sign Up </button>

                                                                  <span>  <h1 style={{textAlign:'center', margin:'0'}}> or  </h1> </span>

                                                                  <button style={{zIndex:'2', marginTop:'5px'}}  id="dark-home-button" onClick={this.goTologIn} >  Sign In </button>

                                                                  </div>
                                                          </div>
                                                          <div className="welcome-message">
                                                                  <img id="big-controller" src="/assets/images/bigcontroller.png"></img>
                                                                  <img id="small-controller"  src="/assets/images/smallcontroller.png"></img>
                                                          </div>
                                                </div>

                                                <div className="home-bottom">

                                                  <div  id="skaters" style={{backgroundImage:"url(/assets/images/skaters.png)"}}>  <h1>Crossover to real-life.</h1></div>
                                                </div>

                                                <div className="about-crossever">
                                                  <h1> Crossever your local gaming community.</h1>
                                                  <p>With the vision to bring back the good old times of computer gaming, we wanted to re-connect the so separated MMO community by connecting them to the community around them!  </p>
                                                </div>
                                              <FooterComponent/>

                              </div>

            </div>

        </div>

    );
  }
}


  var mapStateToProps= function(state){

        return {
            loggedUser:state.loggedUser,
            display_settings:state.display_settings
        }
  }

   var HomeContainer = connect(mapStateToProps)(Home);

export default HomeContainer;
