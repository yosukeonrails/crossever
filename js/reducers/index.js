var actions = require('../actions/index');
import {LOG_IN, GET_FACEBOOK_USER, GET_TOP_GAMES,SEARCH_GAME, SET_USER_INFO} from '../actions/index';

import {handle} from 'redux-pack';


var stateDefault = {

    userInformation:{
        name:null,
        first_name:null,
        locationData:null,
        gamesArray:null
    }

};



var reducer = function(state, action) {

    state = state || stateDefault;

    switch (action.type) {

      case LOG_IN:

      return handle(state, action, {

        start: s => ({
               ...s,
               isLoading: true,
               fooError: null
             }),
        finish: s => ({ ...s, isLoading: false }),
        failure: s => ({ ...s, userError: action.payload }),
        success: s => ({ ...s, loggedUser: action.payload , manuallyLogged:true  }),

      });



        case GET_FACEBOOK_USER:

    return handle(state, action, {

      failure: s => ({ ...s, callError:action.payload }),

      success: s => ({ ...s, loggedUser:action.payload, manuallyLogged:false  }),

    });



        case GET_TOP_GAMES:

        return handle(state, action, {

        failure: s => ({ ...s, callError:action.payload }),

        success: s => ({ ...s, topGames:action.payload.top }),

        });


        case SEARCH_GAME:

        return handle(state, action, {

        failure: s => ({ ...s, callError:action.payload }),

        success: s => ({ ...s, foundGames:action.payload.games }),

        });




          case SET_USER_INFO:

                return  { ...state ,  userInformation: action.userInfoData }

          break;



    }
      // return Object.assign({}, state, {contents:state.contents.slice(0)});
      return {...state}
};



export default reducer;
