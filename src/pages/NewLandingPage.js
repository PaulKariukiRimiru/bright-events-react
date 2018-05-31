import React, { Component } from 'react';
import { connect } from 'react-redux';
import Parallax from 'react-springy-parallax';
import {
  Typography,
  Button,
  Toolbar,
  Paper
} from '@material-ui/core';
import GridComponent from '@material-ui/core/Grid';
import { Grid } from 'react-flexbox-grid';
import Down from '@material-ui/icons/KeyboardArrowDown';
import NewDialog from '../components/NewDialog';
import {
  logoutUser,
  loginUser,
  registerUser
} from '../actions/accountActions';
import { dismissMessageAction } from '../actions';
import NotificationComponent from '../components/NotificationComponent';
/**
 * Landing page Container component
 * @export
 * @class NewLandingPage
 * @extends Component
 */
export class NewLandingPage extends Component {
  state = {
    userDetails: {},
    showDialog: false
  }
  /**
   * handles the display of the login/register dialog
   * @memberof NewLandingPage
   * @returns {undefined}
   */
  showAccountDialog = () => {
    this.setState({
      showDialog: true
    });
  }
  /**
   * handles the population of the login/register form on the state
   * @memberof NewLandingPage
   * @param {Object} event
   * @returns {undefined}
   */
  onChangeListener = (event) => {
    const myStateCopy = this.state;
    myStateCopy.userDetails[event.target.name] = event.target.value;
    return this.setState(myStateCopy);
  }
  /**
   * handles the dispatch of the registration action
   * @memberof NewLandingPage
   * @param {Object} event
   * @returns {undefined}
   */
  handleRegistrationFormSubmit = (event) => {
    event.preventDefault();
    this
      .props
      .registerUser(this.state.userDetails, () => {
        this.showAccountDialog();
      });
  }
  /**
   * handles the dispatch of the login action
   * @memberof NewLandingPage
   * @param {Object} event
   * @returns {undefined}
   */
  handleLoginFormSubmit = (event) => {
    event.preventDefault();
    this
      .props
      .loginUser(this.state.userDetails, () => {
        this.handleDialogClose();
        this.props.history.push('/home');
      });
  }
  /**
   * handles the closing of the login/register dialog
   * @memberof NewLandingPage
   * @returns {undefined}
   */
  handleDialogClose = () => {
    this.setState({
      showDialog: false
    });
  }

  render() {
    const { showDialog } = this.state;
    const { message, fetching } = this.props;
    const imageOne = `url(${require('../images/barImage.jpg')})`;
    const imageTwo = `url(${require('../images/djimage.jpg')})`;
    const imageThree = `url(${require('../images/mdrink.jpg')})`;
    const imageFive = `url(${require('../images/party.jpg')})`;
    return (
      <Grid fluid style={{ margin: 0, padding: 0 }}>
        <GridComponent container direction='column' spacing={0} style={{ backgroundColor: '#424242' }}>
          {showDialog &&
          <NewDialog
              view='account'
              open={showDialog}
              title='Login or create new Account'
              onChange={this.onChangeListener}
              handleLogin={this.handleLoginFormSubmit}
              handleRegister={this.handleRegistrationFormSubmit}
              loading={fetching}
              handleClose={this.handleDialogClose}
            />
            }
          <GridComponent item>
            <Toolbar style={{ width: '100%', color: '#ffffff' }}>
              <Button style = {
                {
                  marginLeft: 'auto',
                  marginRight: 16,
                }
              }
              onClick={this.showAccountDialog}
              color = "inherit" > Login / Register </Button>
            </Toolbar>
          </GridComponent>
          <GridComponent item >
            <Parallax ref="parallax" pages={5} style={{ margin: 0, padding: 0, width: '100%' }}>
              <Parallax.Layer offset={0.6} speed={-0.04} style={{ backgroundImage: imageTwo, backgroundSize: 'cover' }} />
              <Parallax.Layer offset={1.5} speed={-0.04} style={{ backgroundImage: imageFive, backgroundSize: 'cover' }}/>
              <Parallax.Layer offset={2.5} speed={-0.04} style={{ backgroundImage: imageOne, backgroundSize: 'cover' }}/>
              <Parallax.Layer offset={3.5} speed={-0.04} style={{ backgroundImage: imageTwo, backgroundSize: 'cover' }}/>
              <Parallax.Layer
                offset={0}
                speed={0.5}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundImage: imageThree,
                  backgroundSize: 'cover'
                  }}>
                <GridComponent container direction='column'>
                  <Paper style={{
                    maxWidth: 600,
                    maxHeight: 600,
                    marginRight: 'auto',
                    marginLeft: 'auto',
                    padding: 16,
                    backgroundColor: '#424242',
                    opacity: '0.8'
                  }} >
                  <GridComponent container alignItems='center' direction='column'>
                    <Typography
                      variant='display3'
                      align='center'
                      style={{ marginBottom: 24, marginTop: 24, color: '#e0e0e0' }}
                      color='#ffffff'>
                      Hey there!
                    </Typography>
                    <Typography
                      variant='subheading'
                      align='center'
                      color='#e0e0e0'
                      style={{ color: '#e0e0e0' }}>
                      Welcome to Bright Events
                    </Typography>
                    <Button variant="fab" color="secondary" aria-label="add" style={
                        {
                          marginTop: 24,
                          marginBottom: 24,
                          marginLeft: 'auto',
                          marginRight: 'auto',
                        }
                      }
                      onClick = {
                        () => this.refs.parallax.scrollTo(1)
                      }
                      >
                      <Down />
                    </Button>
                    </GridComponent>
                  </Paper>
                </GridComponent>
              </Parallax.Layer>
              <Parallax.Layer
                offset={1}
                speed={1}
                onClick = {
                  () => this.refs.parallax.scrollTo(2)
                }
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#424242'
                }}>
                <GridComponent container direction='row' alignItems='center' justify='center'>
                  <GridComponent item xs={12} sm={12} md={12} lg={12}>
                    < Typography
                      variant = 'display1'
                      align = 'center'
                      style={{
                        color: '#fff'
                      }} >
                      The future of event creation and management systems.
                    </Typography>
                  </GridComponent>
                </GridComponent>
              </Parallax.Layer>
              <Parallax.Layer
                offset={2}
                speed={0.5}
                onClick = {
                  () => this.refs.parallax.scrollTo(3)
                }
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#424242'
                  }}>
                <GridComponent container direction='row' alignItems='center' justify='center'>
                  <GridComponent item xs={12} sm={12} md={12} lg={12}>
                    < Typography
                      variant = 'display1'
                      align = 'center'
                      style={{
                        color: '#fff'
                      }} >
                      Create events with ease <br/>using our fully adaptable site.
                      This ensures wherever you <br />
                      on whatever device your experience remains the same
                    </Typography>
                  </GridComponent>
                </GridComponent>
              </Parallax.Layer>
              <Parallax.Layer
                offset={3}
                speed={1}
                onClick = {
                  () => this.refs.parallax.scrollTo(4)
                }
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#424242'
                  }}>
                <GridComponent container direction='row' alignItems='center' justify='center'>
                  <GridComponent item xs={12} sm={12} md={12} lg={12}>
                    < Typography
                      variant = 'display1'
                      align = 'center'
                      style={{
                        color: '#fff'
                      }} >
                      Our systems are made to make you feel at home
                      while you manage < br />your events and reservations all at a single point
                    </Typography>
                  </GridComponent>
                </GridComponent>
              </Parallax.Layer>
              <Parallax.Layer
                offset={4}
                speed={0.5}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#424242'
                  }}>
                <GridComponent container justify='center' alignItems='center' direction='column'>
                  <GridComponent item>
                    <Typography
                      align='center'
                      variant='display1'
                      style={{
                        color: '#fff'
                      }} >
                      Okay, Lets break it down,<br />
                      We are the difference between Tickets still available and TOTALY SOLD OUT!!<br/>
                      Sign up now and lets take your event experience to the next level
                    </Typography>
                  </GridComponent>
                  <GridComponent item>
                  <Button color='secondary' variant='raised' size="large" style={{ marginTop: 48 }} onClick={this.showAccountDialog}>
                    GET ME IN
                  </Button>
                  </GridComponent>
                </GridComponent>
              </Parallax.Layer>
            </Parallax>
          </GridComponent>
          {message.status && <NotificationComponent
              message={message.message}/>
            }
        </GridComponent>
      </Grid>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  fetching: state.calls > 0,
  message: state.transaction.message,
  displayed: state.transaction.message.status,
  history: ownProps.history
});

const mapDispatchToProps = dispatch => ({
  loginUser: (userDetails, callBack) => {
    dispatch(loginUser(userDetails, callBack));
  },
  registerUser: (userDetails, callBack) => {
    dispatch(registerUser(userDetails, callBack));
  },
  logoutUser: (userId, callBack) => {
    dispatch(logoutUser(userId, callBack));
  },
  dismissMessage: () => {
    dispatch(dismissMessageAction());
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(NewLandingPage);
