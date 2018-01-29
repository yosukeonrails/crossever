
import { push } from 'react-router-redux';

require('isomorphic-fetch');
 import ClientId from '../env.js';



// POSTS//

export var GET_POSTS_BY_GROUPID= 'GET_POSTS_BY_GROUPID';

  export function getPostByGroupID(groupID){
    return {
      type:GET_POSTS_BY_GROUPID,
      promise:fetch('/postmessage/'+groupID).then(function(data){
         return  data.json();
      })
    }
  }



// display
 export var CHANGE_DISPLAY_SETTINGS= 'CHANGE_DISPLAY_SETTINGS'

 export function changeDisplaySettings(display){

     return {
        type:CHANGE_DISPLAY_SETTINGS,
        display_settings:display
     }

 }

export var GET_USER_INFORMATION= 'GET_USER_INFORMATION';

 export function getUserInformation(userID){
   return {
     type:GET_USER_INFORMATION,
     promise:fetch('/userinformation/'+userID).then(function(data){
        return  data.json();
     })
   }
 }

export var CREATE_USER_INFORMATION= 'CREATE_USER_INFORMATION';

 export function createUserInformation(userData) {

 var fetchData={
 method:'POST',
 headers:{
  'Content-Type':'application/json'
 },
 body:JSON.stringify({

   userID:userData.userID,
   username:userData.username,
   details:userData.details
 })

 };

 return {
 type: CREATE_USER_INFORMATION,
 promise: fetch('/userinformation', fetchData).then(function(data){
   console.log(data)
 return data.json();
 })
 };
 }


 export var GET_GAMECITY_BY_USER= 'GET_GAMECITY_BY_USER';

 export function getGameCityByUser(userID){
   return{
     type:GET_GAMECITY_BY_USER,
     promise:fetch('/gamecity/member/'+userID).then(function(data){
       return data.json();
     })
   }
 }


  export var GET_GROUPGAME_BY_USER= 'GET_GROUPGAME_BY_USER';

  export function getGameGroupByUser(userID){
    return{
      type:GET_GROUPGAME_BY_USER,
      promise:fetch('/gamegroup/member/'+userID).then(function(data){
        return data.json();
      })
    }
  }


export var GET_GAMEGROUP_BY_ID= 'GET_GAMEGROUP_BY_ID';

export function getGameGroupById(gameid){
  return{
    type:GET_GAMEGROUP_BY_ID,
    promise:fetch('/gamegroup/'+gameid).then(function(data){
      return data.json();
    })
  }
}


export var GET_GAMECITY_BY_ID= 'GET_GAMECITY_BY_ID';

export function getGameCityById(gameCityID){
  return{
    type:GET_GAMECITY_BY_ID,
    promise:fetch('/gamecity/'+gameCityID).then(function(data){
      return data.json();
    })
  }
}



 export var CREATE_GAMECITY= 'CREATE_GAMECITY';

 export function createGameCity(city) {

 var fetchData={
 method:'POST',
 headers:{
  'Content-Type':'application/json'
 },
 body:JSON.stringify({

   gameCityID:city.gameCityID,
   name:city.name,
   gameID:city.gameID,
   cityID:city.cityID,
   gameData:city.gameData,
   location:city.location,
   members:city.members

 })

 };

 return {
 type: CREATE_GAMECITY,
 promise: fetch('/gamecity', fetchData).then(function(data){


 return data.json();

 })
 };
 }



 /// UPDATE GAMEGROUP


  export var UPDATE_CITY_GROUP= 'UPDATE_CITY_GROUP';

  export function updateGameCity(city) {

  var fetchData={
  method:'PUT',
  headers:{
   'Content-Type':'application/json'
  },
  body:JSON.stringify({
    gameCityID:city.gameCityID,
    members:city.members
  })

  };

  return {
  type: UPDATE_CITY_GROUP,
  promise: fetch('/gamecity', fetchData).then(function(data){


  return data.json();

  })
  };
  }

 // UPDATE



 export var CREATE_GAME_GROUP= 'CREATE_GAME_GROUP';

 export function createGameGroup(group) {

 var fetchData={
 method:'POST',
 headers:{
  'Content-Type':'application/json'
 },
 body:JSON.stringify({

   name:group.name,
   gameID:group.gameID,
   gameData:group.gameData,
   members:group.members

 })

 };

 return {
 type: CREATE_GAME_GROUP,
 promise: fetch('/gamegroup', fetchData).then(function(data){


 return data.json();

 })
 };
 }



 /// UPDATE GAMEGROUP


  export var UPDATE_GAME_GROUP= 'UPDATE_GAME_GROUP';

  export function updateGameGroup(group) {

  var fetchData={
  method:'PUT',
  headers:{
   'Content-Type':'application/json'
  },
  body:JSON.stringify({
    gameID:group.gameID,
    members:group.members
  })

  };

  return {
  type: UPDATE_GAME_GROUP,
  promise: fetch('/gamegroup', fetchData).then(function(data){


  return data.json();

  })
  };
  }

 // UPDATE




export var SET_UP_INFORMATION = 'SET_UP_INFORMATION';

export function setUpInformation(data){

  return{
    type:SET_UP_INFORMATION,
    setUpInformation:data
  }
}



export var GET_TOP_GAMES= 'GET_TOP_GAMES'

export function getTopGames(){
  return{
    type:GET_TOP_GAMES,
    promise:fetch('https://api.twitch.tv/kraken/games/top?limit=100&api_version=5',
  {
    method:'GET',
    headers:{
      'Client-ID': ClientId
      //'Accept':'application/vnd.twitchtv.v5+json'
    }
  }).then(function(data){

    console.log(data);

    return data.json();
  })
  }
}


export var SEARCH_GAME= 'SEARCH_GAME'

export function searchGame(searchString){
  return{
    type:SEARCH_GAME,
    promise:fetch('https://api.twitch.tv/kraken/search/games?query='+searchString+'&type=suggest',
  {
    method:'GET',
    headers:{
      'Client-ID': ClientId
    }
  }).then(function(data){

      console.log(data);
    return data.json();
  })
  }
}


export var ADD_TO_SELECTED_GAME= 'ADD_TO_SELECTED_GAME'

export function addToSelectedGame(list){

    return {
       type:ADD_TO_SELECTED_GAME,
       selectedGameDataArray:list
    }

}


export var ADD_TO_GAME_ID_LIST= 'ADD_TO_GAME_ID_LIST'

export function addToGameIdList(list){

    return {
       type:ADD_TO_GAME_ID_LIST,
       gameIdList:list
    }

}



export var GET_FACEBOOK_USER= 'GET_FACEBOOK_USER'

export function getFacebookUser(){

  return{
  type:GET_FACEBOOK_USER,
  promise: fetch('/user',
  {
method: 'GET',
credentials: 'include'
}).then(function(data){


        return data.json();
  })

};

}





export var LOG_OUT= 'LOG_OUT'

export function logOut(){

  return{
  type:LOG_OUT,
  promise: fetch('/logout',
  {
method: 'GET',
credentials: 'include'
}).then(function(data){
    console.log('loggint out from action');
    console.log(data)
         return data.json();
  })
};

}









 export var LOG_IN='LOG_IN';


 export function LogInUser(data) {

   var fetchData={
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({

         username:data.username,
         password:data.password

      })
   };

   return {
    type: LOG_IN,

    promise: fetch('/login', fetchData).then(function(data){


       return data.json();

      })
  };
}
