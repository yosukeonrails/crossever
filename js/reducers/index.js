var actions = require('../actions/index');
import {LOG_IN, GET_FACEBOOK_USER,LOG_OUT,CHANGE_DISPLAY_SETTINGS,GET_POSTS_BY_GROUPID, GET_TOP_GAMES,SEARCH_GAME, SET_UP_INFORMATION, ADD_TO_SELECTED_GAME, ADD_TO_GAME_ID_LIST,GET_USER_INFORMATION,CREATE_USER_INFORMATION, GET_GAMECITY_BY_USER, GET_GROUPGAME_BY_USER} from '../actions/index';

import {handle} from 'redux-pack';


var stateDefault = {

    selectedGameDataArray: [],
    gameIdList : [],
    loggedUser:null,
    userInformation:null,
    posts:[],
    display_settings:{
      sidebar:{display:'none'},
      postCreator:{display:'none'}
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



      case LOG_OUT:

        console.log('log out at reducers');

       return handle(state, action, {

         failure: s => ({ ...s, logOutError:action.payload }),

         success: s => ({ ...s, loggedUser:"" }),

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




        case GET_POSTS_BY_GROUPID:

        return handle(state, action, {

        failure: s => ({ ...s, callError:action.payload }),

        success: s => ({ ...s, posts:action.payload }),

        });


        //--

        case GET_GAMECITY_BY_USER:

        return handle(state, action, {

        failure: s => ({ ...s, callError:action.payload }),

        success: s => ({ ...s, userGameCity:action.payload.top }),

        });

        case GET_GAMECITY_BY_USER:

        return handle(state, action, {

        failure: s => ({ ...s, callError:action.payload }),

        success: s => ({ ...s, userGameGroup:action.payload.top }),

        });


          //--

        case SEARCH_GAME:

        return handle(state, action, {

        failure: s => ({ ...s, callError:action.payload }),

        success: s => ({ ...s, foundGames:action.payload.games }),

        });

        case GET_USER_INFORMATION:

          return handle(state, action, {

            failure: s => ({ ...s, callError:action.payload }),

            success: s => ({ ...s, userInformation:action.payload[0], manuallyLogged:false  }),

          });

          case CREATE_USER_INFORMATION:

          return handle(state, action , {

            failure: s => ({ ...s, callError:action.payload }),

            success: s => ({ ...s, userInformation:action.payload, manuallyLogged:false  }),

          })

        case CHANGE_DISPLAY_SETTINGS:

              return {...state, display_settings:action.display_settings}


        case ADD_TO_SELECTED_GAME:

              return  { ...state ,  selectedGameDataArray: action.selectedGameDataArray }



        case ADD_TO_GAME_ID_LIST:

              return  { ...state ,  gameIdList: action.gameIdList }



          case SET_UP_INFORMATION:

                return  { ...state ,  setUpInformation: action.setUpInformation }




          break;



    }
      // return Object.assign({}, state, {contents:state.contents.slice(0)});
      return {...state}
};



export default reducer;
