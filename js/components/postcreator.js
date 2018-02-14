require('babel-polyfill');

var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Route = router.Route;
var Link = router.Link;

import {getFacebookUser, getUserInformation,postPost,changeDisplaySettings,getPostByGroupID, getMasterKeyword,postMasterKeyword} from '../actions'
import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'
import {connect} from 'react-redux';

var gray='grayscale(100%)'
var normal='none'
var topicArray=["team","events","general"]
var submit_color= '';
var canSubmit= false;


var selectedTopic={
color:'#ffffff',
backgroundColor:'rgb(43, 166, 103)',
borderRadius:'6px',
paddingTop:'2px' ,
paddingBottom:'2px',
}

export class PostCreator extends React.Component{

  constructor(props){

    super(props)
    this.submitForm= this.submitForm.bind(this);
    this.selectTopic= this.selectTopic.bind(this);
    this.cancel= this.cancel.bind(this);

  }

  componentWillMount(){

          this.setState({
                  team:{color:gray, tagColor:null},
                  events:{color:gray, tagColor:null},
                  general:{color:normal, tagColor:selectedTopic},
                  message:'',
                  title:'',
                  topic:'general'
          })
      }



    handleInput( id, e){

        let data={}
        data[id]=e.target.value;
        this.setState(data);

    }

    checkSubmit(){

      if( this.state.message.length && this.state.message.length > 0){
              submit_color= "#2aa768"
                canSubmit= true;
        } else {
          submit_color= "";
          canSubmit= false;
        }

    }

    cancel(){

      var dis= this;
      let display={}
      Object.assign(display, dis.props.display_settings);
      display.postCreator.display='none'
      dis.props.dispatch(changeDisplaySettings(display));

    }

    selectTopic(e){

      let defaultStyle={
        team:{color:gray, tagColor:null},
        events:{color:gray, tagColor:null},
        general:{color:gray, tagColor:null}
      }

        defaultStyle[e.target.id].color=normal;
        defaultStyle[e.target.id].tagColor= selectedTopic;

        let data={topic:e.target.id};

        this.setState(defaultStyle);
        this.setState(data);

    }

        submitForm(){
          console.log('working?')
          if(!canSubmit){

           return}

          if(this.props.type === 'city'){ var group='gameCityID' } else { var group='gameID' }

          /// here scan through message and topic to get keywords.//
          // after separating them into important pieces , push them into an array
          let title_keys = this.state.title.replace(/\s+/g,' ').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').trim().toLowerCase().split(" ");
          title_keys.filter( (key)=>{ return key.length > 1 } );


          let message_keys= this.state.message.replace(/\s+/g,' ').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').trim().toLowerCase().split(" ");
          message_keys.filter( (key)=>{ return key.length > 1 } );

          var keywords= [...title_keys , ...message_keys];
             keywords.map((keyword)=>{ keywords = keywords.filter( (word)=>{ return word!==keyword }); keywords.push(keyword);   })
             console.log(keywords);

          let data={
             user:this.props.loggedUser,
             title:this.state.title,
             message:this.state.message,
             topic:this.state.topic,
             likedBy:[],
             popularity:0,
             groupType:this.props.type,
             keywords:keywords,
             comments:0
          }

          data.groupID= this.props.group[group];

          var dis=this;

          this.props.dispatch(postPost(data)).then(function(data){

              var postID=data.payload._id;
              console.log(postID);
            // let masterKeyArray= [];
            // get the masterKeywords from DB by cityID


              dis.props.dispatch(getMasterKeyword(dis.props.group[group])).then(function(data){

                let masterKeyArray = [];

                if(data.payload.length > 0 ){ masterKeyArray = data.payload[0].masterKeyArray; }

                let testArray=[ {apple:{id:['id1','id2','id4']}},{app:{id:['id2','id4']}}, {ate:{id:['id2','id4']}} ]

            //  for each key , i want to see if there are any of the same in keywards
            // if so , add the id of the post in the keywards data, then filter out that one from key wards

                  masterKeyArray.map(function(m,i){

                      let index = keywords.indexOf(Object.keys(m)[0]);
                          if( index!== -1 ){
                              m[Object.keys(m)[0]].id.push(postID);
                              console.log(m);
                              keywords.splice(index, 1);
                          }
                    })


                // the remaining are keywords that do not yet exists in masterKeywords;
                // so for each key words , create {[key]:{id:[postID]}}
                keywords.map(function(key){

                        let keywordData= {[key]:{id:[postID]}};
                        masterKeyArray.push(keywordData);
                })



                console.log(masterKeyArray)

                let keyArrayData = {
                  cityID:dis.props.group[group],
                  masterKeyArray:masterKeyArray
                 };
                console.log(keyArrayData)

                 dis.props.dispatch(postMasterKeyword(keyArrayData));

              });


              var display={}
              Object.assign(display, dis.props.display_settings);
              display.postCreator.display='none'
              dis.props.dispatch(changeDisplaySettings(display));

              dis.props.getSettings();

          });



        }


    render () {


      this.checkSubmit();

      var imageUrl= 'url('+this.props.group.gameData.box.medium+')';
      return(

          <div className="post-creator-container">

              <div className="post-creator">

                <div className="post-creator-group" >
                  <div id="group-image"style={{backgroundImage:imageUrl}}></div>
                  <h1>{this.props.group.name}</h1>
                </div>

                <div className="post-creator-right">
                      <h1>Topic</h1>

                                  <div className="post-topic">

                                          <div id="topic-image">
                                          <img   onClick={this.selectTopic}  style={{filter:this.state.general.color}} id="general" src="/assets/icons/discussion.png"/>
                                          <h2 style={this.state.general.tagColor} >General</h2>
                                          </div>

                                          <div id="topic-image">
                                          <img  onClick={this.selectTopic} style={{filter:this.state.team.color}}  id="team" src="/assets/icons/teamrequest.png"/>
                                          <h2 style={this.state.team.tagColor} >Team Request</h2>
                                          </div>

                                          <div id="topic-image">
                                          <img  onClick={this.selectTopic} style={{filter:this.state.events.color}} id="events" src="/assets/icons/events.png"/>
                                          <h2 style={this.state.events.tagColor} >Events</h2>
                                          </div>
                                  </div>


                                  <div className="post-creator-title">
                                    <h1>Title</h1>
                                    <input onChange={ (event)=>{this.handleInput('title', event) } } ></input>
                                  </div>

                                  <div className="post-creator-message">
                                    <h1>Text</h1>
                                    <textarea  onChange={ (event)=>{this.handleInput('message',event) } } rows="20" cols="50" ></textarea>
                                  </div>

                                  <div className="button-container">
                                  <button onClick={this.cancel} id="cancel">Cancel</button>
                                  <button style={{backgroundColor:submit_color}} onClick={this.submitForm} id="submit"  >Submit</button>
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
            display_settings:state.display_settings
        }

  }

   var PostCreatorContainer = connect(mapStateToProps)(PostCreator);

export default PostCreatorContainer;
