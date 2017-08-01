

var React = require('react');
import {connect} from 'react-redux';

import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'

  export class Navigation extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
      var user="";
      var imageUrl="";
      var userNav=null;

        if(this.props.loggedUser){


            user= this.props.loggedUser;

            imageUrl= "url(https://graph.facebook.com/"+this.props.loggedUser.facebookId+"/picture?width=300&height=300)";
            console.log(user);

              userNav= (<div className="user-name">  <h3>Hello , {user.first_name} </h3></div>)
        }

                   return(
                     <div className="navigation">
                         <h1> CrossEver</h1><h2 style={{color:'black'}}>Game</h2>

                                   <div className="user-info">

                                       {userNav}

                                           <div className="user-picture-thumbnail" style={{backgroundImage:imageUrl}}  >
                                           </div>
                                   </div>
                      </div>
                   )
          }
  }



  var mapStateToProps= function(state){


  return {
    loggedUser:state.loggedUser
  }
  }

  var NavigationContainer= connect(mapStateToProps)(Navigation)

  module.exports = NavigationContainer;
