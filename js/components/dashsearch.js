

require('babel-polyfill');

var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Route = router.Route;
var Link = router.Link;


import {getFacebookUser, getUserInformation,changeDisplaySettings,setUpInformation,addToGameIdList, getGameByLocality,addToSelectedGame} from '../actions'
import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'
import {connect} from 'react-redux';
import GameCardContainer from './game-card.js'
var myCities= [];
var cities;


export class DashSearch extends React.Component{

  constructor(props){

    super(props)

    this.addMoreGames = this.addMoreGames.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.findState = this.findState.bind(this);
    this.renderCities= this.renderCities.bind(this);
    this.findMyGames= this.findMyGames.bind(this);

    var display= {}

    Object.assign(display, this.props.display_settings);
    display.sidebar.display='block';

    let cityArray=[];

    this.props.cities.map(function(city){
        cityArray.push(city.cityID);
    })

    this.props.dispatch(changeDisplaySettings(display));

        this.state={
          emptyString:true,
          cityArray:cityArray,
          locality:'mycity',
          state_gamecities:[]
        }

    }

    findMyGames(){

          this.setState({ locality:'mycity'});

    }

    findState(locality){

        var dis=this;


        this.props.dispatch(getGameByLocality(locality,this.props.userInformation.details.locationSummary[locality])).then(function(data){

             let cities= data.payload;
             let my=[];
             let other=[];
             console.log(cities);
                   cities.map(function(city){

                          if(dis.state.cityArray.includes(city.cityID)){
                                my.push(city);
                          } else{
                              other.push(city);
                          }

                   })

            const result_array = [...other, ...my];

            dis.setState({state_gamecities:result_array , locality:locality});

        });
    }

    findCountry(){




    }


    findGlobal(){



    }


    handleInput(e){

        let string= e.target.value;
        let games= [];

        if(string.length === 0){

            this.setState({
              emptyString:true
            })

        }

        if(string.length > 0){

            cities.map(function(game){

              let gameName= game.name.toLowerCase();

                if(gameName.indexOf(string)!== -1){

                    games.push(game);
                }

            })

            this.setState({
              emptyString:false,
              filteredCities:games
            })
        }


    }

    renderCities(locality){
      myCities= [];

      // if(locality === "city" ){
      //     cities=this.props.cities;
      //  }

       switch (locality) {
         case "mycity":
              cities=this.props.cities;
           break;
         case "state":
              cities=this.state.state_gamecities;
           break;
         case "country":
              cities=this.state.state_gamecities;
           break;
         case "city":
              cities=this.state.state_gamecities;
           break;
         default:
       }



        if(this.state.emptyString === true){
              cities.map(function(city){
                      myCities.push(<GameCardContainer data={city} />)
              })
        }

        if(this.state.emptyString === false){
          cities=this.state.filteredCities;
          cities.map(function(city){
                  myCities.push(<GameCardContainer data={city} />)
          })
        }




    }

    addMoreGames(){

      //this.props.dispatch(setUpInformation(null));
      this.props.dispatch(addToSelectedGame([]));
      this.props.dispatch(addToGameIdList([]));
      this.props.dispatch(getUserInformation(this.props.loggedUser.userID))
        hashHistory.push('/moregames/'+this.props.loggedUser.userID)
    }


    render () {



      this.renderCities(this.state.locality);

      //  this.renderMyCities();


      return(

          <div className="dash-search">

          <div className="dash-search-top">
              <div className="dash-search-tag">     <img src="/assets/icons/gameicon.png" /><h1>Your Games</h1> </div>
                <div className="input-container"><input  onChange={this.handleInput} placeholder="Search" ></input><img src="/assets/icons/search.png"/>
                </div>
                <div className="dash-search-bottom">

                    <div className="dash-search-filter-options">
                    <div className="dash-search-filter-container">
                    <button  onClick={this.findMyGames}>My games</button>
                    <button  onClick={ ()=>{this.findState('city')} }>In my city</button>
                    <button  onClick={ ()=>{this.findState('state')} }>Near by Cities</button>
                    </div>
                    </div>

                    <div className="dash-search-filter-options">
                    <div className="dash-search-filter-container">
                    <button onClick={ ()=>{this.findState('country')} }>In your Country</button>
                    <button onClick={this.findGlobal}>Groups Worldwide</button>
                    <button onClick={this.addMoreGames}>Add More Games</button>
                    </div>
                    </div>

                </div>
          </div>



            <div className="dash-results">

                {myCities}

            </div>

          </div>

    );
  }
}


  var mapStateToProps= function(state){

        return {
            loggedUser:state.loggedUser,
            display_settings:state.display_settings,
            userInformation:state.userInformation
        }

  }

   var DashSearchContainer = connect(mapStateToProps)(DashSearch);

export default DashSearchContainer;
