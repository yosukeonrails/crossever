console.log('catch me if you can')

require('babel-polyfill');

var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Route = router.Route;
var Link = router.Link;

import {getFacebookUser,changeDisplaySettings, getUserInformation,getGameCityById, getPostByGroupID} from '../actions'
import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'
import {connect} from 'react-redux';
import PostCreatorContainer from './postcreator.js'

var city=null;
var imageUrl=null;
var cityName=null;
var posts=null;
var post_creator=null;

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
  this.createPost= this.createPost.bind(this)
  this.getCity();
  //this.setState({gotCity:false});
  this.getPosts();

          var display={}
          Object.assign(display, this.props.display_settings);
          display.sidebar.display='block'
          this.props.dispatch(changeDisplaySettings(display));
          console.log(this.params)
    }

        getCity(){
          var dis=this;
          this.props.dispatch(getGameCityById(this.props.params.city_id)).then(function(data){

          city = data.payload[0];
          cityName=city.name;
          imageUrl= 'url('+city.gameData.box.large+')';
          post_creator= <PostCreatorContainer group={city}/>

          dis.setState({gotCity:true})

        });

    }

    createPost(){

          console.log('showing creator')
          var display={}
          Object.assign(display, this.props.display_settings);
          display.postCreator.display='block'
          this.props.dispatch(changeDisplaySettings(display));
    }

    showPosts(){

    }

    getPosts(){

          this.props.dispatch(getPostByGroupID(this.props.params.city_id)).then(function(data){

            console.log(data)

          })

    }

    render () {

      console.log(this.props.display_settings)
      var posts= this.props.posts;

      if(posts.length === 0 ){

        posts= <NoPost createPost={this.createPost} />
      } else {

        this.showPosts();
      }

      if(city===null){
          this.getCity();
      }


      return(

          <div className="dashboard-page">
            <div className="dash-search">


                <div className="city-forum-top">
                    <div className="city-forum-image" style={{backgroundImage:imageUrl}}></div>
                          <h1> {cityName} </h1>
                </div>


                <div className="city-forum-bottom">
                      <div className="city-forum-filters">
                          <div className="filter-input" ><input placeholder="Search:posts,comments,topics"></input><img id="search-icon" src="/assets/icons/search.png"/></div>

                              <div className="city-filters-container">

                                          <div id="city-forum-filter-left">
                                              <label>Filter by:</label>
                                                      <div className="group-filter">
                                                      <h2>HOT</h2>
                                                      </div>
                                            </div>

                                              <div id="city-forum-filter-right">
                                                      <div className="city-forum-filter-buttons">
                                                      <div id="filter-button"><img src="/assets/icons/teamrequest.png"/></div>
                                                      <div id="filter-button"><img src="/assets/icons/events.png"/></div>
                                                      <div id="filter-button">   <img src="/assets/icons/discussion.png"/></div>
                                                      </div>


                                                      <div className="city-forum-filter-labels">
                                                      <label>Team Request</label>
                                                      <label>Events</label>
                                                      <label>Free Discussion</label>
                                                      </div>
                                              </div>

                              </div>
                        </div>
                    </div>



                    <div className="post-results">


                        {posts}


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
        console.log(state);

        return {
            loggedUser:state.loggedUser,
            display_settings:state.display_settings,
            posts:state.posts
        }

  }

   var CityForumContainer = connect(mapStateToProps)(CityForum);

export default CityForumContainer;
