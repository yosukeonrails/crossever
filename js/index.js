
require('babel-polyfill');

var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var hashHistory = router.hashHistory;
var IndexRoute = router.IndexRoute;
import store from './store';


import mainAppContainer from './components/mainapp.js';
import AppContainer from './components/app.js'
import HomeContainer from './components/home.js'
import DashboardContainer from './components/dashboard.js'
import { Provider } from 'react-redux';

var routes = (
    <Router history={hashHistory}>
       <Route path="/" component={AppContainer}>

           <IndexRoute component={mainAppContainer} />

                      <Route path="/home" component={HomeContainer}/>
                      <Route path="/dashboard" component={DashboardContainer}/>
                      
           </Route>

   </Router>
);


document.addEventListener('DOMContentLoaded', function(){

 ReactDOM.render(

    <Provider store={store}>
     {routes}
    </Provider>,

   document.getElementById('app'));

});
