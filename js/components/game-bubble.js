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
import {getTopGames,searchGame, addToSelectedGame, addToGameIdList, setUpInformation} from '../actions/index.js'


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
      this.props.dispatch(searchGame(this.state.searchString))
  }

   selectGame(){

      var gameIdList=[];
      var list = this.props.selectedGameDataArray
      var gameId=this.props.data._id;
      var foundIndex= this.props.gameIdList.indexOf(this.props.data._id) ;
      var setUpData= this.props.setUpInformation;
      //if already added delete
      if( foundIndex === -1 ){
          // if adding
                 this.setState({hoverStyle:' select-game-hover '});
                 list.push(this.props.data)
                 this.props.dispatch(addToSelectedGame(list))

      } else {
        // if exists take the one that was found and take out from the list

              this.setState({hoverStyle: ' '})
              var dis = this

              list.map(function(game, i){
                   if(game._id === dis.props.gameIdList[foundIndex]){
                        list.splice( i ,1)
                   }
              })

             this.props.dispatch(addToSelectedGame(list))
      }



       this.props.selectedGameDataArray.map(function(game){
             var id= game._id;
             gameIdList.push(id);
       })


       this.props.dispatch(addToGameIdList(gameIdList));

       console.log(setUpData)
       Object.assign(setUpData , {games:this.props.selectedGameDataArray})
       this.props.dispatch(setUpInformation(setUpData));
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
     var bubbleImage=""
     var h2Style={fontSize:"12px"};
     var bubbleImageStyle = {backgroundImage:this.props.imageURL}
     hoverStyle = this.state.hoverStyle;
  //    console.log(gameIdList)


    console.log(this.props)
      if(this.props.styles){
         console.log('explicit style')

          let h2= this.props.styles.h2;
          let newH2Style= Object.assign(h2Style , h2)
          h2Style = newH2Style;


          let bubbleImage= this.props.styles.bubbleImage
          let newBubbleStyle= Object.assign(bubbleImageStyle , bubbleImage)

          bubbleImageStyle = newBubbleStyle;
            console.log(bubbleImageStyle)
      }

      if( this.props.gameIdList.includes( this.props.data._id )){
          hoverStyle = ' select-game-hover '
      } else
      {
         hoverStyle = ''
      }



      return(

        <div className="game-container" >

          <div className={'game-image '+hoverStyle} key={this.props.key}  style={bubbleImageStyle}  onMouseOut={()=> this.hoverGame('out')}  onMouseOver={()=> this.hoverGame('in')} onClick={()=> this.selectGame() } >
          </div>

            <h2 style={h2Style}>
                  {this.props.name}
            </h2>

        </div>


    );
  }
}




  var mapStateToProps= function(state){

        return {
            selectedGameDataArray:state.selectedGameDataArray,
            gameIdList:state.gameIdList,
            setUpInformation:state.setUpInformation
        }

  }



var GameBubbleContainer = connect(mapStateToProps)(GameBubble);

export default GameBubbleContainer;
