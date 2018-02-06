
require('babel-polyfill');

var React = require('react');
var ReactDOM = require('react-dom');


import {connect} from 'react-redux';
import SideBarTriangle from 'babel!svg-react!./sidebar-triangle.svg';


export class SideBar extends React.Component{
   constructor (props){
     super(props)

   }

   render(){
     
    var imageUrl;
    var username;
    var sidebarDisplay=this.props.display_settings.sidebar.display;
    if(this.props.loggedUser){

      if(this.props.loggedUser.facebookId !=="guest"){
               username= this.props.loggedUser.first_name;
             imageUrl= "url(https://graph.facebook.com/"+this.props.loggedUser.facebookId+"/picture?width=600&height=600)";

      } else {
             username= this.props.loggedUser.first_name;
            imageUrl="url(/assets/icons/user.png)";
      }

    }


     return (

          <div style={{display:sidebarDisplay}} className="side-bar-container">

                <div className="side-bar-blue-triangle">
                <SideBarTriangle/>
                <div className="side-bar-profile-picture" style={{ backgroundImage:imageUrl }} >
                </div>
                </div>

                <div className="side-bar-greetings"><h1> Hello {' '+username+'! '}</h1> </div>

                <div className="side-bar-buttons">
                    <img src="/assets/icons/messageicon.png" />
                      <img src="/assets/icons/gameicon.png" />
                        <img src="/assets/icons/friends.png" />
                </div>

          </div>
     )
   }

}


var mapStateToProps= function(state){
  return {
      loggedUser:state.loggedUser,
      manuallyLogged:state.manuallyLogged,
      userInformation:state.userInformation,
      display_settings:state.display_settings
  }
}

var SideBarContainer= connect(mapStateToProps)(SideBar);

export default SideBarContainer;
