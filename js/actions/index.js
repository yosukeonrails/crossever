
import { push } from 'react-router-redux';

require('isomorphic-fetch');


export var SET_USER_INFO= 'SET_USER_INFO'

export function setUserInfo(userInfoData){

  return {
     type:SET_USER_INFO,
     userInfoData:userInfoData
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
      'Client-ID':'ncj2zt1sgqxcs3b2ncb98mgtl8ukbs',
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
      'Client-ID':'ncj2zt1sgqxcs3b2ncb98mgtl8ukbs'
    }
  }).then(function(data){

      console.log(data);
    return data.json();
  })
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
