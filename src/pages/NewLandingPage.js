import React, { Component } from 'react';
import { connect } from 'react-redux';
import Parallax from 'react-springy-parallax';
import {
  Typography,
  Button,
  Grid,
  Toolbar
} from 'material-ui';
import { blue } from 'material-ui/colors';
import Down from '@material-ui/icons/KeyboardArrowDown';
import NewDialog from '../components/NewDialog';
import {
  logoutUser,
  loginUser,
  registerUser
} from '../actions/accountActions';
import { dismissMessageAction } from '../actions';
import NotificationComponent from '../components/NotificationComponent';
class NewLandingPage extends Component {
  state = {
    userDetails: {},
    showDialog: false
  }

  showAccountDialog = () => {
    this.setState({
      showDialog: true
    });
  }

  onChangeListener = (event) => {
    const myStateCopy = this.state;
    myStateCopy.userDetails[event.target.name] = event.target.value;
    return this.setState(myStateCopy);
  }

  handleRegistrationFormSubmit = (event) => {
    this
      .props
      .registerUser(this.state.userDetails, () => {
        this.showAccountDialog();
      });
  }

  handleLoginFormSubmit = (event) => {
    this
      .props
      .loginUser(this.state.userDetails, () => {
        this.handleDialogClose();
        this.props.history.push('/home');
      });
  }
  handleDialogClose = () => {
    this.setState({
      showDialog: false
    });
  }

  render() {
    const { showDialog } = this.state;
    const { message, fetching } = this.props;
    const imageOne = `url(${require('../images/audienceone.jpg')})`;
    const imageThree = `url(${require('../images/mdrink.jpg')})`;
    const imageFour = `url(${require('../images/kid.jpg')})`;
    const imageFive = `url(${require('../images/party.jpg')})`;
    return (
      <Grid container direction='column' spacing={0} style={{backgroundColor: '#FFE347'}}>
        <Grid item>
          <Toolbar style={{ width: '100%' }}>
            < Button style = {
              {
                marginLeft: 'auto',
                marginRight: 16,
              }
            }
            onClick={this.showAccountDialog}
            color = "inherit" > Login / Register </Button>
          </Toolbar>
        </Grid>
        <Grid item >
          <Parallax ref="parallax" pages={5} style={{ margin: 0, padding: 0, width: '100%' }}>
            <Parallax.Layer offset={0.6} speed={-0.04} style={{ backgroundImage: imageThree, backgroundSize: 'cover'}} />
            <Parallax.Layer offset={1.5} speed={-0.04} style={{ backgroundImage: imageFive, backgroundSize: 'cover' }}/>
            <Parallax.Layer offset={2.5} speed={-0.04} style={{ backgroundImage: imageOne, backgroundSize: 'cover' }}/>
            <Parallax.Layer offset={3.5} speed={-0.04} style={{ backgroundImage: imageFour, backgroundSize: 'cover' }}/>
            <Parallax.Layer
              offset={0}
              speed={0.5}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFE347'}}>
              <Grid container direction='column'>
                <Typography
                  variant='display3'
                  align='center'
                  style={{ marginBottom: 24 }}
                  color='#ff6e40'>
                  Hey there!
                </Typography>
                <Typography
                  variant='subheading'
                  align='center'>
                  Welcome to Bright Events
                </Typography>
                <Button variant="fab" color="secondary" aria-label="add" style={
                    {
                      marginTop: 24,
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
              </Grid>
            </Parallax.Layer>
            <Parallax.Layer
              offset={1}
              speed={1}
              onClick = {
                () => this.refs.parallax.scrollTo(2)
              }
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFE347' }}>
              <Grid container direction='row' alignItems='center' justify='center'>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  < Typography
                    variant = 'headline'
                    align = 'center' >
                    The future of event creation and management systems.
                  </Typography>
                </Grid>
              </Grid>
            </Parallax.Layer>
            <Parallax.Layer
              offset={2}
              speed={0.5}
              onClick = {
                () => this.refs.parallax.scrollTo(3)
              }
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFE347' }}>
              <Grid container direction='row' alignItems='center' justify='center'>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  < Typography
                    variant = 'headline'
                    align = 'center' >
                    Create events with ease <br/>using our fully adaptable site. This ensures wherever you <br />
                    on whatever device your experience remains the same
                  </Typography>
                </Grid>
              </Grid>
            </Parallax.Layer>
            <Parallax.Layer
              offset={3}
              speed={1}
              onClick = {
                () => this.refs.parallax.scrollTo(4)
              }
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFE347' }}>
              <Grid container direction='row' alignItems='center' justify='center'>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  < Typography
                    variant = 'headline'
                    align = 'center' >
                    Our systems are made to make you feel at home
                    while you manage < br />your events and reservations all at a single point
                  </Typography>
                </Grid>
              </Grid>
            </Parallax.Layer>
            <Parallax.Layer
              offset={4}
              speed={0.5}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFE347' }}>
              <Grid container justify='center' alignItems='center' direction='column'>
                <Grid item>
                  <Typography
                    align='center'
                    variant='display1'>
                    Okay, Lets break it down,<br />
                    We are the difference between Tickets still available and TOTALY SOLD OUT!!<br/>
                    Sign up now and let us show you
                  </Typography>
                </Grid>
                <Grid item>
                <Button color='secondary' variant='raised' size="large" style={{ marginTop: 48 }} onClick={this.showAccountDialog}>
                  GET ME IN
                </Button>
                </Grid>
              </Grid>
            </Parallax.Layer>
          </Parallax>
        </Grid>
        {message.status && <NotificationComponent
            message={message.message}/>
          }
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
})
export default connect(mapStateToProps, mapDispatchToProps)(NewLandingPage);
