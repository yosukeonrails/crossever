require('babel-polyfill');

var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Route = router.Route;
var Link = router.Link;

import {getFacebookUser,changeDisplaySettings, getUserInformation,postChanel,getGameCityById,getMasterKeyword, getChanelsByGameCityID, getPostByGroupID} from '../actions'
import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'
import {connect} from 'react-redux';
import PostCreatorContainer from './postcreator.js'
import GroupPostContainer from './grouppost'
import SearchQuery from './keyword_filter.js';
import SwitchExample from './react-switch.js'

var city=null;
var imageUrl=null;
var cityName=null;
var post_creator=null;
var noPostDisplay='none';
var displayCreateButton= 'none';
var posts= [];
var lightBlue='#1997d4';
var display={
  chanel_creator:'none',
}


export class NoPost extends React.Component {

    render(){

       return (
          <div className="no-posts">
              <h1> There are no posts yet.</h1>
                  <button onClick={this.props.createPost}>Create post</button>
          </div>
       )
    }
}

export class CityForum extends React.Component{

  constructor(props){
  super(props)
  this.getCity = this.getCity.bind(this)
  this.createPost= this.createPost.bind(this);
  this.getChanels= this.getChanels.bind(this);
  this.handleInput= this.handleInput.bind(this);
  this.getLoggedUser= this.getLoggedUser.bind(this);
  this.showPosts = this.showPosts.bind(this);
  this.getAllSetting = this.getAllSetting.bind(this);
  this.toggleFilter = this.toggleFilter.bind(this);
  this.selectedTopic= this.selectedTopic.bind(this);

  this.state={chanels:[],

    emptyQuery:true,

    posts:[],

    selectedTopic:null,

    display:{ chanel_creator:'none' , add_chanel:'block' , cancel_add:'none', chanels_display:'block'},

    chanel_link:'',chanel_name:'',

    city_filters_container:{width:'20%'}, city_forum_filter_left:{width:'100%'}, city_forum_filter_right:{display:'none'},

    filterOn:false,

    team_request: {highlight:'none'}, events: {highlight:'none'},general: {highlight:'none'}

    };


        if(!this.props.loggedUser){
            this.getLoggedUser();
        }

          this.getAllSetting();

          var display={}
          Object.assign(display, this.props.display_settings);
          display.sidebar.display='block';
          display.postCreator.display='none';
          this.props.dispatch(changeDisplaySettings(display));

    }

    getAllSetting(){

      this.getCity();
      this.getPosts();
      this.getChanels();

    }

      getCity(){

          var dis=this;

          this.props.dispatch(getGameCityById(this.props.params.city_id)).then(function(data){

          city = data.payload[0];
          cityName=city.name;
          imageUrl= 'url('+city.gameData.box.large+')';
          post_creator= <PostCreatorContainer getSettings={dis.getAllSetting} type="city" group={city}/>

          dis.setState({gotCity:true, openCity:city })

        });

    }

    toggleStyle(state,key,specific,array){

      let display={};


      if(state[key] === 'block'){
            Object.assign(display,{[key]:'none'});
       } else {
            Object.assign(display,{[key]:'block'});
       }

       if(specific){
          Object.assign(display,{[key]:specific});
       }

       let stateDisplay={};

       Object.assign(stateDisplay,state);
       Object.assign(stateDisplay,display);


        if(array && array.length > 0){

          let toggle_key = array.shift();
          let toggle_display;

          if(stateDisplay[toggle_key] === 'block'){
                  toggle_display="none"
           } else {
                  toggle_display="block"
           }

           return this.toggleStyle(stateDisplay, toggle_key , toggle_display , array);
        }

        this.setState({
          display:stateDisplay
        })

    }

    getLoggedUser(){

      var dis=this;
      this.props.dispatch(getFacebookUser()).then(function(data){

          if(data.error){
            hashHistory.push('/loginpage')
          }


      });
    }

    createPost(){


          var display={}
          Object.assign(display, this.props.display_settings);
          display.postCreator.display='block'
          this.props.dispatch(changeDisplaySettings(display));
    }



    showPosts(filteredPosts, selectedTopic){


        var dis=this;

        posts=[];

        if(this.state.filterOn){

            if(selectedTopic!==null){

                filteredPosts = this.props.posts.filter((post)=>{

                   return post.topic === selectedTopic })

            }
        }



        filteredPosts.map(function(post,i){

                posts.push(<GroupPostContainer  key={i} key_id={"group-post-"+i} data={post} />)
        })


        this.setState({posts:posts});

    }

    getChanels(){
      var dis=this;

        this.props.dispatch(getChanelsByGameCityID(this.props.params.city_id)).then(function(data){

          var chanels=[];

          data.payload.map(function(chanel){
                chanels.push(  <div  className="chanel"><li> <a target="_blank" href={chanel.link}>{chanel.name}</a></li></div> )
          })

          dis.setState({chanels:chanels})


        });
    }

    postChanel(){

        let discord_prefix='https://discord.gg/';

        if(this.state.chanel_name.length===0 || this.state.chanel_link.length===0){

            return
        }

        if(!this.state.chanel_link.includes(discord_prefix)){

            return
        }


        let data={
            name:this.state.chanel_name,
            link:this.state.chanel_link,
            locationData:this.state.openCity.location,
            gameCityID:this.state.openCity.gameCityID,
            gameID:this.state.gameID
        }

        var dis=this;

        this.props.dispatch(postChanel(data)).then(function(){
            dis.getChanels();
        });


    }

    handleInput(e){


        let emptyQuery = false;
        let str= e.target.value;

        if(str.length === 0 ){
          emptyQuery = true;

         }


        this.setState({
            query:str,
            emptyQuery:emptyQuery
        })


        let topic= this.state.selectedTopic;

        if(emptyQuery===false){  this.searchQuery(str) } else {


          this.showPosts(this.props.posts, topic)
         }


    }

    selectedTopic(topic){


      this.setState({ team_request: {highlight:'rgba(51, 51, 51, 0)'}, events: {highlight:'rgba(51, 51, 51, 0)'},general: {highlight:'rgba(51, 51, 51, 0)'}})

        switch (topic) {

          case 'team':
          this.setState({ team_request: {highlight:lightBlue} , selectedTopic:topic })
          break;

          case 'events':
          this.setState({ events: {highlight:lightBlue} ,selectedTopic:topic})
          break;

          case 'general':
          this.setState({ general: {highlight:lightBlue},selectedTopic:topic })
          break;

          default:

        }


          if(this.state.emptyQuery===false){  this.searchQuery(this.state.query) } else {this.showPosts(this.props.posts, topic) }

    }

    toggleFilter(){

      if(!this.state.filterOn){
        // turn ON
        this.setState({filterOn:true, city_filters_container:{width:'60%'}, city_forum_filter_left:{width:'40%'}, city_forum_filter_right:{display:'block'},
            team_request: {highlight:'rgba(51, 51, 51, 0)'}, events: {highlight:'rgba(51, 51, 51, 0)'},general: {highlight:'rgba(51, 51, 51, 0)'}
        })

      } else {
        // turn OFF
        this.setState({filterOn:false, city_filters_container:{width:'20%'}, city_forum_filter_left:{width:'100%'}, city_forum_filter_right:{display:'none'} , selectedTopic:null});
        this.showPosts(this.props.posts, null);
      }

    }



    searchQuery(str){

      let query = str;
      var dis= this;

      dis.props.dispatch(getMasterKeyword(dis.props.params.city_id)).then(function(data){

              let masterKeyWords = data.payload[0].masterKeyArray;
              let searchQuery = new SearchQuery(masterKeyWords,query);
              let searchIds= searchQuery.returnSortedID();
              let postIdArray= [];
              let filteredResults = [];
              dis.props.posts.map((post)=>{ postIdArray.push(post._id) });

              searchIds.map((search_id)=>{ let p = dis.props.posts.filter((post)=>{ return post._id == search_id[0] });  filteredResults.push(p[0]) });

              dis.showPosts(filteredResults,dis.state.selectedTopic);

      })

    }


    getPosts(){
        var dis =this;


          this.props.dispatch(getPostByGroupID(this.props.params.city_id)).then(function(data){


                      if(data.payload.length === 0 ){
                        noPostDisplay='block';
                        displayCreateButton='none';
                        } else {
                        noPostDisplay='none';
                        displayCreateButton='block';
                        dis.showPosts(data.payload, dis.state.selectedTopic );
                      }


          })

    }

    render () {




      return(

          <div className="dashboard-page">
            <div className="dash-search">


                <div className="city-forum-top">
                    <div className="city-forum-image" style={{backgroundImage:imageUrl}}></div>
                          <h1> {cityName} </h1>
                </div>


                <div className="city-forum-bottom">
                        <div className="city-forum-filters">

                                      <div className="filter-input">
                                          <span className="fa fa-search"></span>
                                          <input onChange={(event)=>{ this.handleInput(event); }} placeholder="Search:posts,comments,topics"></input>
                                      </div>

                                <div style={{width:this.state.city_filters_container.width}} className="city-filters-container">

                                      <div style={{width:this.state.city_forum_filter_left.width}} id="city-forum-filter-left">

                                        <div className="react-filter-toggle">
                                          <h1>Filter</h1>

                                          <div className="react-filter-toggle-wrapper">
                                          <label>OFF</label>
                                          <SwitchExample callback={this.toggleFilter} />
                                          <label>ON</label></div>

                                        </div>

                                      </div>

                                      <div style={{display:this.state.city_forum_filter_right.display}}  id="city-forum-filter-right">


                                              <div className="city-forum-filter-buttons">
                                                <div onClick= { ()=>{ this.selectedTopic('team') } } id="filter-button"><img src="/assets/icons/teamrequest.png"/></div>
                                                <div  onClick= { ()=>{ this.selectedTopic('events') } } id="filter-button"><img src="/assets/icons/events.png"/></div>
                                                <div  onClick= { ()=>{ this.selectedTopic('general') } } id="filter-button"> <img src="/assets/icons/discussion.png"/></div>
                                              </div>


                                              <div className="city-forum-filter-labels">
                                                <label style={{backgroundColor:this.state.team_request.highlight}} >Team Request</label>
                                                <label style={{backgroundColor:this.state.events.highlight}}>Events</label>
                                                <label style={{backgroundColor:this.state.general.highlight}}>Free Discussion</label>
                                              </div>
                                      </div>


                              </div>
                        </div>
                    </div>



                    <div className="post-results">



                      <div className="discord-chanels">
                         <img src="/assets/icons/discord.png"></img>
                                <h1>Discord Chanels</h1>

                        <div className="chanels-container">
                          <button style={{display:this.state.display.add_chanel, backgroundColor:'#3150ad'}} onClick={ () => this.toggleStyle(this.state.display, "chanel_creator", null , ["add_chanel","cancel_add","chanels_display"] ) }   > Add chanels</button>
                          <button style={{display:this.state.display.cancel_add, backgroundColor:'#e44545'}} onClick={ () => this.toggleStyle(this.state.display, "cancel_add",  null , ["chanel_creator","add_chanel","chanels_display"] )} > Cancel </button>

                          <div style={{display:this.state.display.chanel_creator}}  className="chanel-creator">
                          <label>link:</label>  <input onChange={ (event)=>{ this.handleInput(event,'chanel_link') } }></input>
                          <label>name:</label>  <input onChange={ (event)=>{ this.handleInput(event ,'chanel_name') } }></input>
                          <button style={{backgroundColor:'#3150ad'}} onClick={ () => { this.toggleStyle(this.state.display,"chanel_creator",  null , ["cancel_add" , "add_chanel","chanels_display"])  ; this.postChanel() } }  > Add </button>
                          </div>

                          <div style={{display:this.state.display.chanels_display}}>
                              {this.state.chanels}
                           </div>
                        </div>



                      </div>

                      <div style={{display:noPostDisplay, float:"right" , width:"55%"}}>
                        <NoPost createPost={this.createPost} />
                      </div>

                      <div className="post-result-container">

                      <button style={{display:displayCreateButton}} onClick={this.createPost}>Create post</button>
                          {this.state.posts}
                      </div>

                      <div className="post-creator-container" style={{display:this.props.display_settings.postCreator.display}}>
                          {post_creator}
                      </div>


                    </div>

                </div>
          </div>
    );
  }
}


  var mapStateToProps= function(state){

        return {
            loggedUser:state.loggedUser,
            display_settings:state.display_settings,
            posts:state.posts
        }

  }

   var CityForumContainer = connect(mapStateToProps)(CityForum);

export default CityForumContainer;
