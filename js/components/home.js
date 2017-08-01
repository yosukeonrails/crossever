

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
                    <div className="log-in-window-container">
                      <LogInWindowContainer/>
                    </div>


                    <div className="welcome-message">

                      <h1>
                        Connect to gamers in your area!
                      </h1>

                    <div className="welcome-icons">
                      <i className="material-icons">videogame_asset</i>
                      <i className="material-icons">trending_flat</i>
                        <i className="material-icons">videogame_asset</i>
                    </div>

                    <button onClick={this.showSignIn} > connect </button>
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
