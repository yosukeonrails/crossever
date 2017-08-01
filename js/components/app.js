var React = require('react');
import {connect} from 'react-redux';

import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'
import NavigationContainer from './navigation.js'


export class App extends React.Component{

          constructor(props){
          super(props);

          }
        render () {




              return(
                        <div>
                                <NavigationContainer/>
                                    {this.props.children}

                        </div>
              );
        }
}


var mapStateToProps= function(state){


return {
  loggedUser:state.loggedUser
}
}

var AppContainer= connect(mapStateToProps)(App)

module.exports = AppContainer;
