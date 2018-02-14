

require('babel-polyfill');

var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Route = router.Route;
var Link = router.Link;
import SetupStep2Container from './step2';
import SetupStep3Container from './step3';
import SetupStep4Container from './step4';
import {getFacebookUser, getUserInformation,addToSelectedGame, createUserInformation,changeDisplaySettings,setUpInformation} from '../actions'
import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'
import {connect} from 'react-redux';
import LoadingContainer from './loading.js'
//dv for default values''
var dv= {
  username:null,
}

var lightBlue= '#45abbd';

export class StepOne extends React.Component{

   render(){

         return(
             <div>
                 <div className="step1-container"><h1> Hello , {dv.username}  </h1>
                 <div style={{width:"100px", height:"100px",backgroundImage:"url("+this.props.image+")" }} className="step1-image"> </div>
                 <h1> Welcome to CrossEver!</h1>
                 <h2>Hey! We need to get to know you a bit more ! Can we ask you some questions?</h2>
                 </div>

             </div>
         )

   }
}

export class SetUp extends React.Component{

  constructor(props){

      super(props)
      this.nextStep= this.nextStep.bind(this);
      this.setPercentage= this.setPercentage.bind(this);
      this.blockSubmission = this.blockSubmission.bind(this);


      this.state={button:{color:lightBlue} ,submittable:true}
    }
    componentWillMount(){
        this.props.dispatch(getFacebookUser())

        this.setState({step:0})
        this.setState({
            loadingDisplay:'none',
            loadingPercentage:0
        })

    }

    setPercentage( display ,percentage){

        if(Math.round(percentage) >= 100){
            display='none'
        }
        this.setState({
          loadingDisplay:display,
          loadingPercentage:percentage
        })

    }
    getUser(){

          if(this.props.loggedUser){

           var loggedUser= this.props.loggedUser;
           dv.username= loggedUser.first_name

            }

    }

    blockSubmission(bool){

        if(bool){
          this.setState({  button:{color:'grey'}, submittable:false });
        } else {   this.setState({  button:{color:lightBlue}, submittable:true  });
       }

    }

    nextStep(){

      if(this.state.submittable === false){ return }

      if(this.props.setUpInformation ){

        var display={}

          this.setState({
            loadingDisplay:'block',
            loadingPercentage:30
          })


          var userInfo= this.props.userInformation;
          var data= this.props.setUpInformation;

          Object.assign(userInfo, {details:data} );

          var dis= this;

          this.setState({
            loadingPercentage:50
          })


          this.props.dispatch(createUserInformation(userInfo))

          this.setState({
            loadingDisplay:'none',
            loadingPercentage:0
          })


      }

        if(this.state.step=== 3 ){

            this.props.dispatch(setUpInformation(null));
            this.props.dispatch(addToSelectedGame([]))
            hashHistory.push('/userdashboard')

         }

      this.setState({step:this.state.step+1})
      // once set up begins and there is data to bind to userInfo
      if(this.state.step === 0){

        this.props.dispatch(createUserInformation({
              username:dv.username,
              userID:this.props.loggedUser.userID,
              details:null,
              image:this.props.userImage
        }))
      }

    }



    render () {

      this.getUser();

      var stepsArray=[<StepOne image={this.props.loggedUser.userImage} username={dv.username} />,<SetupStep2Container blockSubmission={this.blockSubmission}/>,<SetupStep3Container blockSubmission={this.blockSubmission}/>,<SetupStep4Container setPercentage={this.setPercentage} />]

      return(
        <div>
         <LoadingContainer display={this.state.loadingDisplay} percentage={this.state.loadingPercentage} />

        <div className="setup-window">

            {stepsArray[this.state.step]}
            <button style={{backgroundColor:this.state.button.color}} onClick={this.nextStep}> Next </button>
        </div>
        </div>
    );
  }
}


  var mapStateToProps= function(state){

        return {
            loggedUser:state.loggedUser,
            manuallyLogged:state.manuallyLogged,
            topGames:state.topGames,
            selectedGameDataArray: state.selectedGameDataArray,
            setUpInformation:state.setUpInformation,
            userInformation:state.userInformation,
            display_settings:state.display_settings
        }

  }

   var SetUpContainer = connect(mapStateToProps)(SetUp);

export default SetUpContainer;
