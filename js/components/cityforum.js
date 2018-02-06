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
import GroupPostContainer from './grouppost'
var city=null;
var imageUrl=null;
var cityName=null;
var post_creator=null;
var noPostDisplay='none';
var displayCreateButton= 'none';
var posts= [];
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
          display.sidebar.display='block';
          display.postCreator.display='none';
          this.props.dispatch(changeDisplaySettings(display));

    }

        getCity(){
          var dis=this;
          this.props.dispatch(getGameCityById(this.props.params.city_id)).then(function(data){

          city = data.payload[0];
          cityName=city.name;
          imageUrl= 'url('+city.gameData.box.large+')';
          post_creator= <PostCreatorContainer type="city" group={city}/>

          dis.setState({gotCity:true})

        });

    }

    createPost(){


          var display={}
          Object.assign(display, this.props.display_settings);
          display.postCreator.display='block'
          this.props.dispatch(changeDisplaySettings(display));
    }

    showPosts(){

        posts=[];
        this.props.posts.map(function(post,i){
                posts.push(<GroupPostContainer key_id={"group-post-"+i} data={post} />)
        })


    }

    getPosts(){
      
          this.props.dispatch(getPostByGroupID(this.props.params.city_id)).then(function(data){

          })

    }

    render () {



      posts= this.props.posts;

      if(posts.length === 0){
          noPostDisplay='block';
            displayCreateButton='none';

      } else {
          noPostDisplay='none';
          displayCreateButton='block';
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

                      <div style={{display:noPostDisplay}}>
                        <NoPost createPost={this.createPost} />
                      </div>

                      <div>
                        <button style={{display:displayCreateButton}} onClick={this.createPost}>Create post</button>
                          {posts}
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
