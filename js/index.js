
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
import AppContainer from './components/app.js';
import HomeContainer from './components/home.js';
import UserDashboardContainer from './components/userdashboard.js';
import SetUpContainer from './components/setup.js'
import LogInPageContainer from './components/loginpage.js'
import { Provider } from 'react-redux';

var routes = (
    <Router history={hashHistory}>
       <Route path="/" component={AppContainer}>

           <IndexRoute component={mainAppContainer} />

                      <Route path="/home" component={HomeContainer}/>
                      <Route path="/userdashboard" component={UserDashboardContainer}/>
                      <Route path="/loginpage" component={LogInPageContainer}/>
                      <Route path="/setup" component={SetUpContainer}/>

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
