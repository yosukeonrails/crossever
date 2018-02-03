console.log('catch me if you can')

require('babel-polyfill');

var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Route = router.Route;
var Link = router.Link;
var pageWidth= "100%";
import {getFacebookUser, getUserInformation} from '../actions'
import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'
import {connect} from 'react-redux';



export class Loading extends React.Component{

  constructor(props){

    super(props)

    }



    render () {

      console.log(this.props)
      
      if(this.props.display_settings.viewPort.marginLeft ==="200px" ){

            pageWidth="80%";
      } else{
            pageWidth="100%";
      }

      var loadingWidth= (this.props.percentage/3) + "%"

      return(

          <div style={{width:pageWidth, display:this.props.display}} className="loading-page">


                  <div className="loading-widget-container">
                            <h1> Crossing.....</h1>

                            <div className="loading-bar">

                            <div className="loading-empty"></div>
                            <div style={{width:loadingWidth}} className="loading-fill"></div>

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
            loadingPercentage:state.loadingPercentage,
            display_settings:state.display_settings
        }

  }

   var LoadingContainer = connect(mapStateToProps)(Loading);

export default LoadingContainer;
