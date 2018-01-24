console.log('catch me if you can')

require('babel-polyfill');

var React = require('react');
var ReactDOM = require('react-dom');

var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var Link = router.Link;

var currentTyped=[];
var timerIsOn= false;
var bufferTime = 0;
var start= 0;
var end= 0;

import {setUpInformation} from '../actions'
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
    this.onType=this.onType.bind(this);
    this.state = { address: 'San Francisco, CA' }
  }

  componentDidMount(){
           // check if user is logged and make the userinfodata , if not redirect

           if(this.props.loggedUser){
                 // if mannyally logged,
                 if(this.props.loggedUser.facebookId ==="guest"){
                   console.log('manually logged , make user different') }
                   else{
                    console.log('make sure to have a user')
                 }
           }
  }

  onType(address){
        // creating a delay


     var dis= this;
     var d= new Date();
     start= d.getTime();

     setTimeout(function(){

       var d= new Date();
        end= d.getTime();
       var buffer= end - start; // star will be the current start

      if(buffer> 400) { dis.onChange(address) }
      // set Time out will only take the CURRENT V
    },400)


  }

  onChange(address){

    this.setState({ address:address})
    // add a delay so it doesnt do this every time its typed
    var locationData='';
    var dis= this;

    geocodeByAddress(address).then(function(results){

        locationData= results[0];
       var setUpData = {};
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

        Object.assign(setUpData, {locationData:locationData, locationSummary:addressSummary}) ;
        console.log(setUpData)
        console.log('attaching')
        dis.props.dispatch(setUpInformation(setUpData));

    })



  //  this.props.dispatch(setUserInfo());

  }


  handleFormSubmit(event){

     event.preventDefault()

     geocodeByAddress(this.state.address).then(function(results){

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

        <div className="step2-question">
            <h1> Where are you located? </h1> <img src="/assets/icons/local.png"></img>
        </div>

            <p> You can input just city and state or your address for better results.</p>

              <div className="places-input" style={{ height: '9vh', fontSize: '4vh' , color:'#168bf7'}} >
               <PlacesAutocomplete  inputProps={inputProps} />
              </div>

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
            setUpInformation:state.setUpInformation

        }

  }



var SetupStep2Container = connect(mapStateToProps)(SetupStep2);

export default SetupStep2Container;
