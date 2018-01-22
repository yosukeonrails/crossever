
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
        if(this.props.loggedUser && this.props.loggedUser.facebookId!=="guest"){
                username= this.props.loggedUser.first_name;
               imageUrl= "url(https://graph.facebook.com/"+this.props.loggedUser.facebookId+"/picture?width=600&height=600)";
        } else {
          console.log('image is undefined , no logged user or manually logged')
        }

     return (
          <div className="side-bar-container">



                <div className="side-bar-blue-triangle">
                <SideBarTriangle/>
                <div className="side-bar-profile-picture" style={{ backgroundImage:imageUrl }} >
                </div>
                </div>

                <div className="side-bar-greetings"><h1> Hello {' '+username+'! '}</h1> </div>



          </div>
     )
   }

}


var mapStateToProps= function(state){
  return {
      loggedUser:state.loggedUser,
      manuallyLogged:state.manuallyLogged,
      userInformation:state.userInformation
  }
}

var SideBarContainer= connect(mapStateToProps)(SideBar);

export default SideBarContainer;
