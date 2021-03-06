

var React = require('react');
import {connect} from 'react-redux';

import {push} from 'react-router-redux';
import {hashHistory} from 'react-router';
import {logOut} from '../actions'

var display={
  arrowDown:'none',
  navigation_menu:'none'
}

  export class Navigation extends React.Component{

    constructor(props){
        super(props);

    this.logOut = this.logOut.bind(this);

    }

    componentWillMount(){

      this.setState({
         display:display
      });

    }

    redirectToLogIn(){
       hashHistory.push('/loginpage')
    }

    goHome(){
        hashHistory.push('/')
    }

    logOut(){
      var dis=this;

       this.props.dispatch(logOut()).then(function(data){

             window.location.href='/';
       })
    }


    toggleStyle(key,specific){

      if(this.state.display[key] === 'block'){
            display[key] = 'none';
       } else {
             display[key] = 'block';
       }

       if(specific){
          display[key] = specific;
       }

        this.setState({
          display:display
        })

    }


    render(){
      var user="";
      var imageUrl="";
      var userNav=null;


        if(this.props.loggedUser){

            display.arrowDown='block'
            imageUrl=this.props.loggedUser.userImage
            user= this.props.loggedUser;


              userNav= (<div className="user-name">  <h3>Hello , {user.first_name} </h3></div>)
        }

                   return(
                     <div className="navigation">
                        <h1 onClick={this.goHome} > CROSSEVER</h1><h2 style={{color:'black'}}>  </h2>

                                   <div className="user-info">

                                       {userNav}


                                           <div className="user-picture-thumbnail" style={{backgroundImage:"url("+imageUrl+")"}}  >
                                           <div className="arrowdown" onClick={() => this.toggleStyle("navigation_menu")} style={{display:this.state.display.arrowDown}}><img src="assets/icons/arrowdown.png"/></div>

                                           </div>
                                   </div>

                                   <div style={{display:display.navigation_menu}} onMouseLeave={()=>{ this.toggleStyle("navigation_menu","none") }} className="navigation-menu">
                                        <ul>
                                              <li onClick={()=>{ this.logOut(); this.toggleStyle("navigation_menu","none")  }} > LogOut </li>
                                              <hr/>
                                              <li> Account </li>
                                        </ul>
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
