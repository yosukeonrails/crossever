

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

            imageUrl="url(/assets/icons/user.png)"

            if(this.props.loggedUser.facebookId !== 'guest'){

                  imageUrl= "url(https://graph.facebook.com/"+this.props.loggedUser.facebookId+"/picture?width=300&height=300)";
            }

            user= this.props.loggedUser;


            console.log(user);
            console.log(imageUrl);

              userNav= (<div className="user-name">  <h3>Hello , {user.first_name} </h3></div>)
        }

                   return(
                     <div className="navigation">
                         <h1> CROSSEVER</h1><h2 style={{color:'black'}}>  </h2>

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
    console.log(state)

  return {
    loggedUser:state.loggedUser
  }
  }

  var NavigationContainer= connect(mapStateToProps)(Navigation)

  module.exports = NavigationContainer;
