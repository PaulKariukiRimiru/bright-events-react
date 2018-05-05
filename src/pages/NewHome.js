import {connect} from 'react-redux';
import React, {Component} from 'react';

import {Typography, SwipeableDrawer, Chip} from 'material-ui';
import ExpansionPanel, {ExpansionPanelSummary, ExpansionPanelDetails} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GridComponent from 'material-ui/Grid';
import Account from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import {Grid} from 'react-flexbox-grid';
import Hidden from 'material-ui/Hidden';
import FilterForm from '../components/FilterFormComponent';
import GridCard from '../components/GridItemComponent';
import {
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
import {dismissMessageAction} from '../actions';
import isObjectEmpty from 'is-empty-object';
import jwt_decode from 'jwt-decode';
import {TOKEN} from '../Constants/action_type';
import MyAppBar from '../components/AppBar';
import {Button} from 'material-ui';
import {blue} from 'material-ui/colors';
import AddIcon from '@material-ui/icons/Add';
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
    events: []
  }

  displayAllEvents = () => {
    this.setState({
      displayed: 'allEvents',
      events: this.props.events
    });
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
      events: this.props.userRsvps.filter(event => event.attendance)
    });
  }

  displayRsvpsNotAttending = () => {
    this.setState({
      displayed: 'userRsvps',
      events: this.props.userRsvps.filter(event => !event.attendance)
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

  sortItemsToDisplay = (selection, isChecked) => {
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
      .rsvpEvent(eventId, this.props.user.email);
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
      .deleteEvent(eventId);
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
      this.setState({ editForm: {} });
    }
  }

  onRsvpRequest = (id) => {
    this
      .props
      .fetchRsvps(id);
    this.showRsvpListDialog();
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
      : jwt_decode(localStorage.getItem(TOKEN)).identity.id;
    eventDetails.token = localStorage.getItem(TOKEN);
    this
      .props
      .createEvent(eventDetails);
  }

  handleAttendanceToggle = (eventId, attendance) => {
    this
      .props
      .changeAttendance({ event_id: eventId, attendance });
  }

  onChange = (event) => {
    const myStateCopy = this.state;
    myStateCopy.form[event.target.name] = event.target.value;
    return this.setState(myStateCopy);
  }

  handleRegistrationFormSubmit = (event) => {
    this
      .props
      .registerUser(this.state.form);
  }

  handleLoginFormSubmit = (event) => {
    this
      .props
      .loginUser(this.state.form);
  }

  handleDialogClose = () => {
    if (this.state.view !== 'rsvpList') {
      this.setState({ showDialog: false });
    }
  }

  componentWillMount() {
    this.setState({
      events: this.props.events
    });
    this
      .props
      .getEvents();
    this
      .props
      .getUserRsvps();
  }

  render() {
    const { user, fetching, message, rsvps } = this.props;
    const { filterSelection, showDialog, view, title, events, displayed } = this.state;
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
          openDrawer={this.toggleDrawer}
          showAccountDialog={this.showAccountDialog}/>
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
            <GridComponent item xs={0} sm={0} md={0} lg={3}>
              <ExpansionPanel style={{ margin: 8, marginTop: 20 }}>
                <ExpansionPanelSummary expandIcon={< ExpandMoreIcon />} style={{ margin: 8 }}>
                  <Typography variant="title" gutterBottom>Filters</Typography>
                  <div style={{ marginLeft: 16 }}>
                    { filterSelection && filterSelection.length
                      ? filterSelection.map((selection, index) => { < Chip label = {
                          selection.name
                        } />;
                      })
                      : <div/>
}
                  </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <FilterForm direction='column' sortItemsToDisplay={this.sortItemsToDisplay} />
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </GridComponent>
          </Hidden>
          <GridComponent item xs={12} sm={12} md={12} lg={9}>
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
          {message.status && <NotificationComponent
            handleDialogClose={this.handleDialogClose}
            message={message.message}/>
}
        </GridComponent>
        <NewDialog
          open={showDialog}
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
  fetching: state.calls.activeCalls > 0,
  message: state.transaction.message,
  displayed: state.transaction.message.status,
  history: ownProps.history
});

const mapDispatchToProps = dispatch => ({
  getEvents: () => {
    dispatch(eventsGet());
  },
  getUserRsvps: () => {
    dispatch(userRsvpsGet());
  },
  dismissMessage: () => {
    dispatch(dismissMessageAction());
  },
  deleteEvent: (eventId) => {
    dispatch(eventDelete(eventId));
  },
  deleteRsvp: (eventDetails) => {
    dispatch(userDeleteRsvp(eventDetails));
  },
  editEvent: (id, eventDetails) => {
    dispatch(eventEdit(id, eventDetails));
  },
  fetchRsvps: (id) => {
    dispatch(eventRsvpGet(id));
  },
  changeRsvpStatus: (id, statusDetails) => {
    dispatch(eventManageRsvp(id, statusDetails));
  },
  createEvent: (eventDetails) => {
    dispatch(eventPost(eventDetails));
  },
  changeAttendance: (attendanceDetails) => {
    dispatch(userAttendanceChange(attendanceDetails));
  },
  rsvpEvent: (eventId, email) => {
    dispatch(eventRsvp(eventId, email));
  },
  loginUser: (userDetails) => {
    dispatch(loginUser(userDetails));
  },
  registerUser: (userDetails) => {
    dispatch(registerUser(userDetails));
  }

});

export default connect(mapStateToProps, mapDispatchToProps)(NewHome);
