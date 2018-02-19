var React = require('react');

import {connect} from 'react-redux';
import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'


export class FooterComponent extends React.Component{

        constructor(props){
        super(props);

          }
          render () {

              return(
                        <div className="footer">

                          <div className="footer-links">
                              <div className="social-media-link"><a href="https://discord.gg/HDhdUWW"><img src="/assets/icons/facebook_round.png"></img></a></div>
                              <div className="social-media-link"><a href="https://github.com/yosukeonrails/crossever"> <img src="/assets/icons/github.png"></img></a></div>
                              <div className="social-media-link"><a href="https://discord.gg/HDhdUWW"> <img src="/assets/icons/discord.png"></img></a></div>
                          </div>

                          <div className="footer-title">
                              <h1>Crossever</h1><i className="fa fa-copyright" aria-hidden="true"></i> <span className="copyright">All Rights Reserved.</span> 
                          </div>

                          <div className="footer-bottom">
                          </div>

                        </div>
              );
        }
}



module.exports = FooterComponent;
