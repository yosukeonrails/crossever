// console.log('catch me if you can')
//
// require('babel-polyfill');
//
// var React = require('react');
// var ReactDOM = require('react-dom');
// var router = require('react-router');
// var Router = router.Router;
// var Route = router.Route;
// var Link = router.Link;
// var lookedForUserInformation= false;
//
// import {push} from 'react-router-redux'
// import {hashHistory} from 'react-router'
// import {connect} from 'react-redux';
// import SetupStep2Container from './step2.js'
// import SetupStep3Container from './step3.js'
// import SetupStep4Container from './step4.js'
// import {getFacebookUser, getTopGames,getUserInformation} from '../actions/index.js'
// import SideBarContainer from './sidebar.js';
// var loggedUser;
// var warning='';
//
// export class Dashboard extends React.Component{
//
//   constructor(props){
//
//
//     super(props)
//
//     this.nextStep= this.nextStep.bind(this);
//
//
//
//     var dis=this;
//
//     if(this.props.manuallyLogged !== true){
//        this.props.dispatch( getFacebookUser() ).then(function(data){
//          //after logging , find User information//
//            dis.getUser(data.payload.facebookId);
//       });
//    }
//
//
//   }
//
//   componentWillMount(){
//
//        this.setState({step:0})
//        this.setState({warning:''})
//        this.setState({lookedForUserInformation:false})
//     }
//
//     componentDidMount(){
//       // get userInformation if not , then create one by the setUp
//
//
//      // this.props.dispatch(getUserInformation(userID))
//     }
//
//     getUser(userID){
//
//       var dis= this;
//
//         this.props.dispatch(getUserInformation(userID)).then(function(data){
//
//           lookedForUserInformation = true;
//           dis.setState({lookedForUserInformation:true})
//
//         })
//
//     }
//
//
//     nextStep(){
//
//       if(this.state.step === 2 && this.props.selectedGameDataArray.length === 0 ){
//         console.log('need To have more than 0');
//         this.setState({warning:'Please select one or more games before moving on.'})
//         return
//       }
//
//
//         var currentStep= this.state.step;
//         this.setState({step:currentStep+1})
//
//
//     }
//
//     render () {
//
//       var step1= (  <div className="step1-container">   <h1> Hello , {username}  </h1> <h1> Welcome to CrossEver!</h1><h2>{setUpMessage}</h2></div>)
//       var step2= (<SetupStep2Container/>)
//       var step3= (<SetupStep3Container warning={this.state.warning} />)
//       var step4 = (<SetupStep4Container/>)
//       var buttonWord= 'next'
//       var stepArray=[step1, step2, step3 , step4];
//       var blockOrNone= 'none';
//       var setUpMessage= "Let'get you all set up. We just need to ask you a few questions!"
//       var username="";
//
//
//       // if the user has not been set up yet,
//       if(this.state.lookedForUserInformation === true && this.props.userInformation !== null){
//
//           if(this.props.userInformation.userID === this.props.loggedUser.facebookId){
//               blockOrNone='none'
//               console.log('making it disappear ')
//           } else {
//               console.log('making it appear ')
//                 blockOrNone='block'
//           }
//
//       }
//
//       // if there is a user, display name
//         if(this.props.loggedUser){
//             username= this.props.loggedUser.first_name;
//         //    userID= this.props.loggedUser.facebookId;
//         }
//
//
//
//
//         if(this.state.step === 3 ){
//            buttonWord= 'Done';
//          }
//
//          if(this.state.step ===4){
//            console.log('step 4')
//             blockOrNone='none'
//
//          }
//
//
//       return(
//
//           <div className="dashboard-page">
//                   <SideBarContainer/>
//                   <div style={{display:blockOrNone}} className="setup-window">
//
//                             <div className="setup-content">
//
//                                       {stepArray[this.state.step]}
//
//                                       <button  onClick={this.nextStep}>{buttonWord}</button>
//
//                             </div>
//                   </div>
//
//           </div>
//
//     );
//   }
// }
//
//
//   var mapStateToProps= function(state){
//         console.log(state);
//
//         return {
//             loggedUser:state.loggedUser,
//             manuallyLogged:state.manuallyLogged,
//             topGames:state.topGames,
//             selectedGameDataArray: state.selectedGameDataArray,
//             userInformation:state.userInformation
//         }
//
//   }
//
//    var DashboardContainer = connect(mapStateToProps)(Dashboard);
//
// export default DashboardContainer;
