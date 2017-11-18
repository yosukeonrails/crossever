console.log('catch me if you can')

require('babel-polyfill');

var React = require('react');
var ReactDOM = require('react-dom');
var hoverStyle='';
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var Link = router.Link;


import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'
import {connect} from 'react-redux';
import {getTopGames,searchGame, addToSelectedGame, addToGameIdList} from '../actions/index.js'


export class GameBubble extends React.Component{

  constructor(props){

    super(props)

    this.handleFormSubmit= this.handleFormSubmit.bind(this);
    this.submitSearch= this.submitSearch.bind(this);
    this.hoverGame= this.hoverGame.bind(this);

  }

  componentWillMount(){
    this.setState({ hoverStyle:' '  });
         this.setState({selected: false});
  }
  submitSearch(){
    console.log(this.state.searchString);
      this.props.dispatch(searchGame(this.state.searchString))
  }

   selectGame(){

      var gameIdList=[];
      var list = this.props.selectedGameDataArray
      var gameId=this.props.data._id;
     //when clicked , take the info of the game like this:
     //add to a list following data , but add as list[id] {name:  data }
     // selectedGameArray[id] = {name: , id:  , data:}

     list[gameId]= this.props.data
      //this.setState({hoverStyle:' select-game-hover '})


       this.setState({hoverStyle:' select-game-hover '});
       this.props.dispatch(addToSelectedGame(list))

       this.props.selectedGameDataArray.map(function(game){
             var id= game._id;
             gameIdList.push(id);
       })

       console.log(gameIdList)
       this.props.dispatch(addToGameIdList(gameIdList));

       if( gameIdList.includes(this.props.data._id) ){
           this.setState({selected: true});
        //   this.setState({hoverStyle:' select-game-hover '})
       }


   }

   hoverGame(action){

     if(this.state.selected === true ){ return }

     if(action==='in'){
        this.setState({hoverStyle:' select-game-hover '})
      hoverStyle = ' select-game-hover ';
     } else {
       this.setState({hoverStyle:' '})
      hoverStyle = ' ';
     }


   }


  handleFormSubmit(event){
     event.preventDefault()


   }

    render () {

     var gameIdList=[];

     hoverStyle = this.state.hoverStyle;
  //    console.log(gameIdList)


//  console.log(this.props)

      if( this.props.gameIdList.includes( this.props.data._id )){
          hoverStyle = ' select-game-hover '
      }


      return(

        <div className="game-container" >

          <div className={'game-image '+hoverStyle} key={this.props.key}  style={{backgroundImage:this.props.imageURL}}  onMouseOut={()=> this.hoverGame('out')}  onMouseOver={()=> this.hoverGame('in')} onClick={()=> this.selectGame() } >
          </div>

            <h2 style={{ fontSize:"12px"}}>
                  {this.props.name}
            </h2>

        </div>


    );
  }
}




  var mapStateToProps= function(state){

        return {
            selectedGameDataArray:state.selectedGameDataArray,
            gameIdList:state.gameIdList
        }

  }



var GameBubbleContainer = connect(mapStateToProps)(GameBubble);

export default GameBubbleContainer;
