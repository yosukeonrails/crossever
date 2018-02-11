
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
import LogInPageContainer from './components/loginpage.js';
import CityForumContainer from './components/cityforum.js';
import PostPageContainer from './components/postpage.js'
import SignUpContainer from './components/signup.js'
import MoreGamesContainer from './components/moregames.js'
import SetupStep4Container from './components/step4.js'
import { Provider } from 'react-redux';

var routes = (
    <Router history={hashHistory}>
       <Route path="/" component={AppContainer}>
           <IndexRoute component={mainAppContainer} />
              <Route path="/home" component={HomeContainer}/>
              <Route path="/userdashboard" component={UserDashboardContainer}/>
              <Route path="/loginpage" component={LogInPageContainer}/>
              <Route path="/signup" component={SignUpContainer}/>
              <Route path="/gamecity/:city_id" component={CityForumContainer}/>
              <Route path="/setup" component={SetUpContainer}/>
              <Route path="/crossever_post/:id" component={PostPageContainer}/>
              <Route path="/moregames/:id" component={MoreGamesContainer}/>
              <Route path="/step4" component={SetupStep4Container}/>
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
