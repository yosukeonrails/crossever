require('babel-polyfill');

var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Route = router.Route;
var Link = router.Link;

import {getFacebookUser, getUserInformation,getTopGames,searchGame,addToSelectedGame,addToGameIdList,getGameGroupByUser,setUpInformation,createUserInformation} from '../actions'
import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'
import {connect} from 'react-redux';
import GameBubbleContainer from './game-bubble';
import SelectedGamesContainer from './selected-games'
import GroupGeneratorContainer from './group-generator'
export class MoreGames extends React.Component{

  constructor(props){

    super(props)

    this.addSelectedGames = this.addSelectedGames.bind(this);
    this.getGroupByUser = this.getGroupByUser.bind(this);
    this.getTopGames = this.getTopGames.bind(this);
    this.setPercentage= this.setPercentage.bind(this);
    this.handleInput = this.handleInput.bind(this);



    this.state= {
        topGames:[],
        generator:""
    }


    }


    componentDidMount(){

      var dis= this;
      this.setState({emptyString:true})
      this.setState({hoverClass:'game-image'})

      this.setState({
          loadingDisplay:'none',
          loadingPercentage:0
      })

      let setUpData={};
      Object.assign(setUpData , this.props.userInformation.details);
      this.props.dispatch(setUpInformation(setUpData));

        this.getTopGames();

        this.getGroupByUser();

      }

      getTopGames(){
        var dis= this;

          this.props.dispatch(getTopGames()).then(function(data){

                  dis.setState({
                      topGames:data.payload.top,
                      gameList:['nothing'],
                      bubbleDataReady:false
                  })

          });

      }

      getGroupByUser(){
        var dis= this;

        this.props.dispatch(getGameGroupByUser(this.props.params.id)).then(function(data){


              let myGamesIDs= [];
                    data.payload.map(function(game){
                    let num= parseInt(game.gameID, 10)
                     myGamesIDs.push(num);
              })


             dis.setState({
                 myGamesIDs:myGamesIDs
             })


        });

      }
      addSelectedGames(){

        if(this.props.setUpInformation && this.props.userInformation){

          let myGames=this.props.userInformation.details.games;

          this.props.setUpInformation.games.map(function(game){
              myGames.push(game)
          })

          let sum= myGames;
          let setUpData= this.props.setUpInformation;
          Object.assign(setUpData , {games:sum} );

          this.props.dispatch(createUserInformation(setUpData));

          let generator= <GroupGeneratorContainer setPercentage={this.setPercentage} callBack={this.addingIsDone}/>
          this.setState({generator:generator})

        //  this.props.dispatch(setUpInformation(null));
        //  this.props.dispatch(addToSelectedGame([]))
          this.getGroupByUser();
          this.renderBubbles(this.props.topGames, this.state.emptyString );

        }


      }


      setPercentage( display ,percentage){

          if(Math.round(percentage) >= 100){
              this.addingIsDone()
              display='none'
          }

          this.setState({
            loadingDisplay:display,
            loadingPercentage:percentage
          })

      }

      addingIsDone(){

      //this.props.dispatch(setUpInformation(null));
          this.props.dispatch(addToSelectedGame([]));
          this.props.dispatch(addToGameIdList([]));

          hashHistory.push('/userdashboard')
      }

      handleInput(e){

          if(e.target.value.length === 0){
              this.setState({emptyString:true})

          } else{

              this.props.dispatch(searchGame(e.target.value));
              this.setState({emptyString:false})
          }


      }

      renderBubbles(topGames, emptyString){

        var gameList= [];

        if(this.props.foundGames && this.state.myGamesIDs && emptyString === false){

                var dis= this;
                gameList=[];

           this.props.foundGames.map(function(game, i){
                  var hoverStyle=''
                  // if found inside selectedData with same id , then seleted === false
                  var selected= false;
                  var imageURL= 'url('+game.box.large+')';
                //  var stringID= game.game._id.toString();
                //  console.log(stringID)
                      if(dis.state.myGamesIDs.includes(game._id) === false ){

                          gameList.push(<GameBubbleContainer name={game.name} selected={false} imageURL={imageURL} id={i} key={i} data={game} />)
                      }

                    })

                return gameList
            } else if (topGames && this.state.myGamesIDs && emptyString === true){

          var dis= this;
           gameList=[];

           this.props.topGames.map(function(game, i){
                  var hoverStyle=''
                  // if found inside selectedData with same id , then seleted === false
                  var selected= false;
                  var imageURL= 'url('+game.game.box.large+')';

                      if(dis.state.myGamesIDs.includes(game.game._id) === false ){

                          gameList.push(<GameBubbleContainer name={game.game.name} selected={false} imageURL={imageURL} id={i} key={i} data={game.game} />)
                      }

                    })
            }

          return gameList
      }


    render () {


      let gameList= this.renderBubbles(this.props.topGames, this.state.emptyString  );


      return(

        <div className="dash-search">

        <div className="dash-search-top">
            <div className="dash-search-tag">     <img src="/assets/icons/gameicon.png" /><h1>More Games</h1> </div>
              <div className="input-container"><input  onChange={this.handleInput} placeholder="Search" ></input><img src="/assets/icons/search.png"/>

              </div>
        </div>

          <div className="more-games-container">

              <div id="more-games-selected-games" className="more-games-selected-games">
                  <SelectedGamesContainer styles={{ bubbleLeft:"left", bubbleImage:{width:"70px",height:"70px", marginTop:"10px"}, h2:{fontSize:"10px",marginTop:"10px", width:"70px"} }} />
              </div>

                <div id="add-games">
                    <button onClick={this.addSelectedGames} > Add Games </button>
                </div>
          </div>

          <div className="dash-results"  style={{color:"white"}}>
              {this.state.generator}
              {gameList}

          </div>

        </div>

    );
  }
}


  var mapStateToProps= function(state){

        return {
            loggedUser:state.loggedUser,
            topGames:state.topGames,
            userInformation:state.userInformation,
            setUpInformation:state.setUpInformation,
            foundGames:state.foundGames
        }

  }

   var MoreGamesContainer = connect(mapStateToProps)(MoreGames);

export default MoreGamesContainer;
