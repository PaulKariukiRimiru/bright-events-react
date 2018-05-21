import { blue } from '@material-ui/core/colors';
import { connect } from 'react-redux';
import { Grid } from 'react-flexbox-grid';
import AddIcon from '@material-ui/icons/Add';
import Category from '@material-ui/icons/Sort';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GridComponent from '@material-ui/core/Grid';
import isObjectEmpty from 'is-empty-object';
import jwtDecode from 'jwt-decode';
import Location from '@material-ui/icons/PinDrop';
import {
  TextField,
  Typography,
  SwipeableDrawer,
  Chip,
  CircularProgress,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Hidden,
  InputAdornment,
  Paper,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import React, { Component } from 'react';
import Search from '@material-ui/icons/Search';

import FilterForm from '../components/FilterFormComponent';
import GridCard from '../components/GridItemComponent';

import {
  logoutUser,
  loginUser,
  registerUser,
  eventPost,
  eventsGet,
  eventEdit,
  eventDelete,
  eventRsvpGet,
  eventManageRsvp,
  eventRsvp,
  userRsvpsGet,
  userAttendanceChange,
  userDeleteRsvp
} from '../actions/accountActions';

import { dismissMessageAction } from '../actions';

import { TOKEN } from '../Constants/action_type';
import MyAppBar from '../components/AppBar';

import NewDialog from '../components/NewDialog';
import NotificationComponent from '../components/NotificationComponent';

export class NewHome extends Component {
  state = {
    drawerOpen: false,
    showDialog: false,
    editForm: {},
    form: {
      username: '',
      email: '',
      password: ''
    },
    filterSelection: [],
    view: 'account',
    displayed: 'allEvents',
    title: '',
    events: [],
    location: [],
    category: []
  }

  logout = () => {
    this.props.logoutUser(this.props.user.id, this.callBack);
  }

  sortFilterItems = () => {
    this.setState({
      location: [...new Set(this.state.location)],
      category: [...new Set(this.state.category)],
    });
  }

  displayAllEvents = () => {
    this.setState({
      displayed: 'allEvents',
      location: this.props.events.map((event, i) => event.location),
      category: this.props.events.map((event, i) => event.category),
      events: this.props.events
    });
    this.sortFilterItems();
  }

  displayUserEvents = () => {
    this.setState({
      displayed: 'userEvents',
      events: this.props.events.filter(event => event.host === this.props.user.id.toString())
    });
  }

  displayUserRsvps = () => {
    this.setState({
      displayed: 'userRsvps',
      events: this.props.userRsvps
    });
  }

  displayRsvpsAttending = () => {
    this.setState({
      displayed: 'userRsvps',
      events: this.props.userRsvps.filter(event => event.attendance && event.accepted)
    });
  }

  displayRsvpsNotAttending = () => {
    this.setState({
      displayed: 'userRsvps',
      events: this.props.userRsvps.filter(event => !event.attendance || !event.accepted)
    });
  }

  displayRsvpsRejected = () => {
    this.setState({
      displayed: 'userRsvps',
      events: this.props.userRsvps.filter(event => !event.accepted)
    });
  }

  displayRsvpsAccepted = () => {
    this.setState({
      displayed: 'userRsvps',
      events: this.props.userRsvps.filter(event => event.accepted)
    });
  }

  sortItemsToDisplay = (selection) => {
    switch (selection) {
      case 'userEvents':
        this.displayUserEvents();
        break;
      case 'userRsvps':
        this.displayUserRsvps();
        break;
      case 'eventsAttending':
        this.displayRsvpsAttending();
        break;
      case 'eventsNotAttending':
        this.displayRsvpsNotAttending();
        break;
      case 'rsvpsConfirmed':
        this.displayRsvpsAccepted();
        break;
      case 'rsvpsCanceled':
        this.displayRsvpsRejected();
        break;
      default:
        this.displayAllEvents();
        break;
    }
  }

  showAccountDialog = () => {
    this.setState({ showDialog: true, view: 'account', title: 'Login or create an account' });
  }

  showCreateEventDialog = () => {
    this.setState({ showDialog: true, view: 'createEvent', title: 'create event' });
  }

  showRsvpListDialog = () => {
    this.setState({ showDialog: true, view: 'rsvpList', title: 'Event Reservation list' });
  }

  handleRsvpClick = (eventId) => {
    this
      .props
      .rsvpEvent(eventId, this.props.user.email, () => {
        this
          .props
          .getUserRsvps();
      });
  }

  toggleDrawer = () => {
    this.setState({
      drawerOpen: !this.state.drawerOpen
    });
  }

  handleRequestClose = () => {
    this
      .props
      .dismissMessage();
  }

  handleFabClick = () => {
    this.setState({ showDialog: true, view: 1 });
  }

  handleClose = () => {
    this.setState({ showDialog: false });
  }

  onDeleteSubmit = (eventId) => {
    this
      .props
      .deleteEvent(eventId, this.callBack);
  }

  onRsvpDelete = (eventId) => {
    this
      .props
      .deleteRsvp({ event_id: eventId });
  }

  onEditChange = (event, date) => {
    const myStateCopy = this.state;
    if (event) {
      myStateCopy.editForm[event.target.name] = event.target.value;
    } else {
      myStateCopy.editForm.time = date
        .toISOString()
        .substring(0, 10);
    }

    return this.setState(myStateCopy);
  }

  onEditSubmit = (id) => {
    if (!isObjectEmpty(this.state.editForm)) {
      this
        .props
        .editEvent(id, this.state.editForm);
      this.setState({ editForm: {}, showDialog: false });
    }
  }

  onRsvpRequest = (id) => {
    this
      .props
      .fetchRsvps(id, this.callBack);
  }

  onToggleRsvpStatus = (id, status, email) => {
    const details = {
      accept_status: status,
      client_email: email
    };
    this
      .props
      .changeRsvpStatus(id, details);
  }

  onFinish = (eventDetails) => {
    this.setState({ showDialog: false });
    eventDetails.host = this.props.user.id
      ? this.props.user.id
      : jwtDecode(localStorage.getItem(TOKEN)).identity.id;
    eventDetails.token = localStorage.getItem(TOKEN);
    this
      .props
      .createEvent(eventDetails, this.callBack);
  }

  handleAttendanceToggle = (eventId, attendance) => {
    this
      .props
      .changeAttendance({ event_id: eventId, attendance }, () => {
        this.displayUserRsvps();
      });
  }

  onChange = (event) => {
    const myStateCopy = this.state;
    myStateCopy.form[event.target.name] = event.target.value;
    return this.setState(myStateCopy);
  }

  handleRegistrationFormSubmit = (event) => {
    this
      .props
      .registerUser(this.state.form, () => {
        this.showAccountDialog();
      });
  }

  handleLoginFormSubmit = (event) => {
    this
      .props
      .loginUser(this.state.form, () => {
        this.handleDialogClose();
      });
  }

  handleDialogClose = () => {
    this.setState({ showDialog: false });
  }

  componentDidMount() {
    this
      .props
      .getEvents(this.callBack);
    this.displayAllEvents();
  }

  locationSelect = location => (event) => {
    this.setState({
      events: this.state.events.filter(selectedEvent => selectedEvent.location === location)
    });
  }

  categorySelect = category => (event) => {
    this.setState({
      events: this.state.events.filter(selectedEvent => selectedEvent.category === category)
    });
  }

  onSearchChange = (evnt) => {
    const { events } = this.props;
    this.setState({
      events: events.filter(myEvent => myEvent.name.includes(evnt.target.value.toLowerCase()))
    });
  }


  callBack = (method) => {
    switch (method) {
      case 'logout':
        localStorage.clear();
        this.props.history.push('/');
        break;
      case 'deleteEvent':
        this.displayAllEvents();
        break;
      case 'requestRsvp':
        this.showRsvpListDialog();
        break;
      case 'fetchEvents':
        this.props.getUserRsvps();
        break;
      case 'createEvent':
        this.displayAllEvents();
        break;
      default:
        break;
    }
  }

  render() {
    const {
      user,
      fetching,
      message,
      rsvps
    } = this.props;
    const {
      filterSelection, showDialog, view, title, events, displayed,
    } = this.state;
    const fabStyle = {
      position: 'fixed',
      bottom: '24px',
      right: '16px'
    };
    const fields = [
      {
        description: 'Give the event a name',
        fields: [
          {
            name: 'name'
          }
        ]
      }, {
        description: 'Where will it be?',
        fields: [
          {
            name: 'location'
          }
        ]
      }, {
        description: 'what category is the event',
        fields: [
          {
            name: 'category'
          }
        ]
      }, {
        description: 'When will this be?',
        fields: [
          {
            name: 'time'
          }
        ]
      }
    ];

    return (
      <Grid fluid style={{
        padding: 0,
        margin: 0
      }}>
        <MyAppBar
          user={user}
          openDrawer={this.toggleDrawer}
          showAccountDialog={this.showAccountDialog}
          logout={this.logout}/>

        <SwipeableDrawer
          open={this.state.drawerOpen}
          onOpen={this.toggleDrawer}
          onClose={this.toggleDrawer}>
          <div>
            <GridComponent container direction='row' justify='flex-start'>
              <div
                style={{
                backgroundColor: blue[400],
                height: 100
              }}/>
              <FilterForm direction='row' sortItemsToDisplay={this.sortItemsToDisplay}/>
            </GridComponent>
          </div>
        </SwipeableDrawer>
        < GridComponent container direction='row'>
          <Hidden mdDown>
            <GridComponent container direction='column' xs={0} sm={0} md={0} lg={3}>
              <GridComponent item >
                <Paper style={{ margin: 8, marginTop: 20 }}>
                  <TextField
                    id="input-with-icon-textfield"
                    label="Search"
                    onChange={this.onSearchChange}
                    onKeyPress={this.onSearchSubmit}
                    style={{ margin: 12, width: '90%', marginLeft: 18 }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <Search />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Paper>
              </GridComponent>
              <GridComponent item >
                <ExpansionPanel style={{ margin: 8 }}>
                  <ExpansionPanelSummary expandIcon={< ExpandMoreIcon />} style={{ margin: 8 }}>
                    <Typography gutterBottom variant="display1" component="h2" noWrap={true} style={{ fontSize: 18 }}>Filters</Typography>
                    <div style={{ marginLeft: 16 }}>
                      { filterSelection && filterSelection.length
                        ? filterSelection.map((selection, index) => (
                          < Chip label = {
                            selection.name
                          } />
                        ))
                        : <div/>
                      }
                    </div>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <FilterForm direction='column' sortItemsToDisplay={this.sortItemsToDisplay} />
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </GridComponent>
              <GridComponent item >
                <ExpansionPanel style={{ margin: 8 }}>
                  <ExpansionPanelSummary expandIcon={< ExpandMoreIcon />} style={{ margin: 8 }}>
                    <Typography gutterBottom variant="display1" component="h2" noWrap={true} style={{ fontSize: 18 }}>Category</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Grid container direction='column'>
                    <List>
                      { events.map((event, index) => (
                        <ListItem
                          key={index}
                          dense
                          button
                          onClick={this.categorySelect(event.category)}>
                          <ListItemIcon>
                            <Category />
                          </ListItemIcon>
                          <ListItemText
                            primary={event.category}
                          />
                        </ListItem>
                        ))
                      }
                    </List>
                    <Button primary='true' onClick={this.displayAllEvents}>Reset</Button>
                    </Grid>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </GridComponent>
              <GridComponent item >
                <ExpansionPanel style={{ margin: 8 }}>
                  <ExpansionPanelSummary expandIcon={< ExpandMoreIcon />} style={{ margin: 8 }}>
                    <Typography
                      gutterBottom
                      variant="display1"
                      component="h2" noWrap={true} style={{ fontSize: 18 }}>Location</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <GridComponent container direction='column'>
                    <List>
                      {events.map((event, index) => (
                        <ListItem
                          key={index}
                          dense
                          button
                          onClick={this.locationSelect(event.location)}>
                          <ListItemIcon>
                            <Location />
                          </ListItemIcon>
                          <ListItemText
                            primary={event.location}
                          />
                        </ListItem>
                        ))
                      }
                    </List>
                    <Button primary='true' onClick={this.displayAllEvents}>Reset</Button>
                    </GridComponent>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </GridComponent>
            </GridComponent>
          </Hidden>
          <GridComponent item xs={12} sm={12} md={12} lg={9}>
            {
              fetching && < CircularProgress size = {
                68
              } style ={{
                marginLeft: 'auto', marginRight: 'auto'
              }}
              />}
            <GridComponent
              container
              spacing={24}
              justify={'center'}
              style={{
              marginTop: 8
            }}>
              {events.map((event, i) => (
                <GridComponent item key={i} xs={12} sm={6} md={4} lg={3}>
                  <GridCard
                    handleAttendanceToggle={this.handleAttendanceToggle}
                    onEditChange={this.onEditChange}
                    onEditSubmit={this.onEditSubmit}
                    onDeleteSubmit={this.onDeleteSubmit}
                    onRsvpDelete={this.onRsvpDelete}
                    onRsvpRequest={this.onRsvpRequest}
                    handleRsvpClick={this.handleRsvpClick}
                    event={event}
                    view = {
                      !isObjectEmpty(user) && displayed.substr(displayed.length - 6) === 'Events'
                        ? event.host === user.id.toString() ? 1 : 2 : 3
                    }
                    />
                </GridComponent>
              ))
            }
            </GridComponent>
          </GridComponent>
          {message.status &&
            <NotificationComponent
              message={message.message}/>
          }
        </GridComponent>
        <NewDialog
          style={{
            marginLeft: 'auto',
            marginRight: 'auto'
          }}
          openDialog={showDialog}
          view={view}
          title={title}
          eventForm={fields}
          loading={fetching}
          onChange={this.onChange}
          handleLogin={this.handleLoginFormSubmit}
          handleSubmit={this.onFinish}
          handleRegister={this.handleRegistrationFormSubmit}
          onToggleRsvpStatus={this.onToggleRsvpStatus}
          closeDialog={this.handleClose}
          handleClose={this.handleClose}
          rsvpList={rsvps}/>
        <Button
          style={fabStyle}
          variant="fab"
          color="primary"
          aria-label="add"
          onClick={this.showCreateEventDialog}>
          <AddIcon/>
        </Button>
      </ Grid>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.account.user,
  events: state.account.events,
  userRsvps: state.account.userRsvps,
  rsvps: state.account.rsvps,
  fetching: state.calls > 0,
  message: state.transaction.message,
  displayed: state.transaction.message.status,
  history: ownProps.history
});

const mapDispatchToProps = dispatch => ({
  getEvents: (callBack) => {
    dispatch(eventsGet(callBack));
  },
  getUserRsvps: () => {
    dispatch(userRsvpsGet());
  },
  dismissMessage: () => {
    dispatch(dismissMessageAction());
  },
  deleteEvent: (eventId, callBack) => {
    dispatch(eventDelete(eventId, callBack));
  },
  deleteRsvp: (eventDetails) => {
    dispatch(userDeleteRsvp(eventDetails));
  },
  editEvent: (id, eventDetails) => {
    dispatch(eventEdit(id, eventDetails));
  },
  fetchRsvps: (id, callBack) => {
    dispatch(eventRsvpGet(id, callBack));
  },
  changeRsvpStatus: (id, statusDetails) => {
    dispatch(eventManageRsvp(id, statusDetails));
  },
  createEvent: (eventDetails, callBack) => {
    dispatch(eventPost(eventDetails, callBack));
  },
  changeAttendance: (attendanceDetails, callBack) => {
    dispatch(userAttendanceChange(attendanceDetails, callBack));
  },
  rsvpEvent: (eventId, email, callBack) => {
    dispatch(eventRsvp(eventId, email, callBack));
  },
  loginUser: (userDetails, callBack) => {
    dispatch(loginUser(userDetails, callBack));
  },
  registerUser: (userDetails, callBack) => {
    dispatch(registerUser(userDetails, callBack));
  },
  logoutUser: (userId, callBack) => {
    dispatch(logoutUser(userId, callBack));
  }

});

export default connect(mapStateToProps, mapDispatchToProps)(NewHome);
