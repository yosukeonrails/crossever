var React = require('react');
import {connect} from 'react-redux';

import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'
import HomeContainer from './home.js'


  export class mainApp extends React.Component{

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

                     <div className="mainApp">


                            <HomeContainer/>
                            <div> Footer </div>


                     </div>
                   )
          }
  }



  var mapStateToProps= function(state){


  return {
    loggedUser:state.loggedUser
  }
  }

  var mainAppContainer= connect(mapStateToProps)(mainApp)

  module.exports = mainAppContainer;
