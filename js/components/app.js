var React = require('react');
import {connect} from 'react-redux';

import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'
import NavigationContainer from './navigation.js'
import SideBarContainer from './sidebar.js';

export class App extends React.Component{

        constructor(props){
        super(props);

          }
          render () {

              return(
                        <div>
                                <NavigationContainer/>

                                  <div className="app-content">
                                      {this.props.children}
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

var AppContainer= connect(mapStateToProps)(App)

module.exports = AppContainer;
