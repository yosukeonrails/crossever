console.log('catch me if you can')

require('babel-polyfill');

var React = require('react');
var ReactDOM = require('react-dom');

var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var Link = router.Link;
import {setUserInfo} from '../actions/index.js'
import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'
import {connect} from 'react-redux';

import PlacesAutocomplete, { geocodeByAddress, getLatLng , geocodeByPlaceId } from 'react-places-autocomplete'
//https://github.com/kenny-hibino/react-places-autocomplete

export class SetupStep2 extends React.Component{

  constructor(props){

    super(props)

    this.handleFormSubmit= this.handleFormSubmit.bind(this);
    this.onChange= this.onChange.bind(this);
    this.state = { address: 'San Francisco, CA' }

  }


  onChange(address){

    this.setState({ address:address })

    var locationData='';
    var dis= this;



    geocodeByAddress(this.state.address).then(function(results){

        console.log(results);
        locationData= results[0];

        console.log(locationData);


        var userInformation = dis.props.userInformation;
        console.log(dis.props.userInformation)

        Object.assign(userInformation, {locationData:locationData}) ;

        dis.props.dispatch(setUserInfo(userInformation));
        console.log(userInformation);

    })



  //  this.props.dispatch(setUserInfo());

  }


  handleFormSubmit(event){

     event.preventDefault()

     geocodeByAddress(this.state.address).then(function(results){

       console.log(results[0]);

     })


   }

    render () {

      const inputProps = {
           value: this.state.address,
           onChange: this.onChange,
         }

      return(

        <div className="step2-page">
        <form onSubmit={this.handleFormSubmit}>
            <h1> Where are you located? </h1>
            <p> You can input just city and state or your address for better results.</p>
               <PlacesAutocomplete inputProps={inputProps} />

             </form>
        </div>

    );
  }
}




  var mapStateToProps= function(state){
    console.log(state)

        return {
            loggedUser:state.loggedUser,
            manuallyLogged:state.manuallyLogged,
            userInformation:state.userInformation

        }

  }



var SetupStep2Container = connect(mapStateToProps)(SetupStep2);

export default SetupStep2Container;
