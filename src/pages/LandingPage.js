import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {Card, CardHeader, CardActions, CardMedia} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Login from '../components/Login';
import Register from '../components/Register';
import { registerUser, loginUser } from '../actions/accountActions';
import { dismissMessageAction } from '../actions/index';

import { connect } from 'react-redux';
import SnackBarComponent from '../components/SnackBarComponent';
import isObjectEmpty from 'is-empty-object';
import { myTheme, landingPageStyle } from '../styles/presentationalStyles';

export class LandingPage extends Component {

  constructor(){
      super();
      this.state = {
          tabValue:0,
          form: { username:'',
                  email:'',
                  password:'' 
                },
          open: false
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleRegistrationFormSubmit = this.handleRegistrationFormSubmit.bind(this);
      this.handleLoginFormSubmit = this.handleLoginFormSubmit.bind(this);
      this.onChange = this.onChange.bind(this);
  };

  componentWillReceiveProps(nextProps, nextContext){
    console.log("next props",nextProps);
    if(!isObjectEmpty(nextProps.user) && !nextProps.displayed){
      nextProps.history.push('/dashboard')
    }
  }

  onChange(event){
    let myStateCopy = this.state
    myStateCopy.form[event.target.name] = event.target.value;
    return this.setState(myStateCopy);
  };

  handleChange(value) {
      this.setState({
          tabValue : value
      });
  };

  handleRegistrationFormSubmit(event) {
    event.preventDefault()
    this.props.registerUser(this.state.form)
  };

  handleLoginFormSubmit(event){
    this.props.loginUser(this.state.form, this.props.history)
  }

  handleRequestClose = () => {
    this.props.dismiss(this.props.history)
  }

  render() {
    const accountsStyle = {
      marginTop : '15%',
      right:0,
    };

    return (
      <div >
        <MuiThemeProvider muiTheme={myTheme}>
            <Grid fluid>
              <Row center="xs">
                <Col xs={6}>
                    <Row middle="xs">
                      <Col xs={12}>
                        <p style={{marginTop:'25%',fontFamily:'Roboto', wordSpacing: 4, lineHeight: 2, fontSize:24}}>Hey there, we are proud to introduce the newest event creation and management system. We link the best event creators out there with clients.
                          <br />But we dont stop there we make sure that our clients are always up to date with the latest, craziest turnups and events in their location. Advertising with us is the difference between TOTALLY SOLD OUT and Tickets still available
                        </p>
                      </Col>
                  </Row>
                </Col>
                <Col xs={6}>
                  <Row center="xs">
                    <Col xs={12}>
                      <div>
                        <Row middle="xs">
                          <Col xsOffset={3} xs={8}>
                            <Card style={accountsStyle}>
                              <CardHeader
                                  title="Welcome to bright events"
                                  subtitle="Sign up or Create an account"
                                  textStyle={{fontFamily:'Roboto', fontSize:18}}
                              />
                              <CardMedia>
                                <Tabs
                                  value={this.state.tabValue}
                                  onChange={this.handleChange}>
                                  <Tab
                                    icon={<FontIcon className="material-icons">person</FontIcon>}
                                    label="Login"
                                    value={0}
                                    />
                                  <Tab
                                      icon={<FontIcon className="material-icons">person_add</FontIcon>}
                                      label="Register"
                                      value={1}
                                      />
                                </Tabs>
                                <SwipeableViews
                                  index={this.state.tabValue}>
                                  <Grid fluid>
                                    <Row center="xs">
                                      <Col xs={10}>
                                        <Login onChange={this.onChange} handleFormSubmition = {this.handleLoginFormSubmit}/> 
                                      </Col>
                                    </Row>
                                  </Grid>
                                  <Grid fluid>
                                    <Row>
                                      <Col>
                                        <Register onChange={this.onChange} handleFormSubmition = { this.handleRegistrationFormSubmit }/> 
                                      </Col>
                                    </Row>
                                  </Grid>
                                </SwipeableViews>
                              </CardMedia>
                              <CardActions>
                              </CardActions>
                          </Card>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Grid>
          <SnackBarComponent 
            open = { this.props.displayed } 
            handleRequestClose = { this.handleRequestClose }
            message={ this.props.message } 
            style = {{fontFamily:'Roboto'}}
            />
        </MuiThemeProvider>
      </div>
    );
  };
};



const mapStateToProps = (state, ownProps) => {
  
  return ({
  user: state.account.user,
  message: state.transaction.message.message,
  displayed: state.transaction.message.status,
  history: ownProps.history
  });
};

function mapDispatchToProps(dispatch){
  return{
    registerUser: (userDetails) => {
      dispatch(registerUser(userDetails));
    },
    loginUser: (userCredentials, history) => {
      dispatch(loginUser(userCredentials, history));
    },
    dismiss: (history) => {
      dispatch(dismissMessageAction(history));
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
