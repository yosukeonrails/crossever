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



    geocodeByAddress(address).then(function(results){


        locationData= results[0];
        var userInformation = dis.props.userInformation;
        var addressSummary= {};

        if(locationData.address_components){


          var addressInfo= locationData.address_components;

          addressInfo.map(function(location){

                    for( var i=0 ; i<location.types.length ; i++){

                                      switch (location.types[i]) {

                                        case "neighborhood":
                                            addressSummary["region"]= location.long_name

                                        case "locality" :
                                            addressSummary["city"]= location.long_name

                                        case "administrative_area_level_1":

                                            addressSummary["state"]= location.long_name

                                        case "country":
                                            addressSummary["country"]= location.long_name


                                          break;
                                        default:

                                      }

                        }

          })

        }

        Object.assign(userInformation, {locationData:locationData, locationSummary:addressSummary}) ;

        dis.props.dispatch(setUserInfo(userInformation));

    })



  //  this.props.dispatch(setUserInfo());

  }


  handleFormSubmit(event){

     event.preventDefault()

     geocodeByAddress(this.state.address).then(function(results){

       console.log(results[0]);

     })

     console.log('here is info')
     console.log(this.props.userInformation)


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
