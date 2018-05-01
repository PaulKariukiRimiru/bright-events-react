import { connect } from 'react-redux';
import React, { Component } from 'react';

import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Paper,
  SwipeableDrawer
} from 'material-ui';
import GridComponent from 'material-ui/Grid';
import Account from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import { Grid } from 'react-flexbox-grid';
import Hidden from 'material-ui/Hidden';
import FilterForm from '../components/FilterFormComponent';
import GridCard from '../components/GridItemComponent';
import {
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
import isObjectEmpty from 'is-empty-object';
import jwt_decode from 'jwt-decode';
import { TOKEN } from '../Constants/action_type';
import MyAppBar from '../components/AppBar';

export class NewHome extends Component {
  state = {
    drawerOpen: false,
    showDialog: false,
    editForm: {}
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
    this.setState({ showDialog: true, view: 3 });
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

  handleTabChange = (value) => {
    this.setState({ tabValue: value });
  }

  handleAttendanceToggle = (eventId, attendance) => {
    this
      .props
      .changeAttendance({ event_id: eventId, attendance });
  }

  handleRsvpClick = (eventId) => {
    this
      .props
      .rsvpEvent(eventId);
  }

  componentWillMount() {
    this
      .props
      .getEvents();
  }

  render() {
    const { events, userEvents, user } = this.props;
    let totalEvents = [];
    if (events && events.length) {
      totalEvents = [...totalEvents, ...events];
    }
    if (userEvents && userEvents.length) {
      totalEvents = [...totalEvents, ...userEvents];
    }
    console.log('events', totalEvents);
    return (
      <Grid fluid style={{ padding: 0 }}>
        <AppBar position='static'>
          <Toolbar>
            <Hidden lgUp>
              <IconButton color="inherit" aria-label="Menu" onClick={this.toggleDrawer}>
                <MenuIcon/>
              </IconButton>
            </Hidden>
            <Typography variant="title" color="inherit">
              Bright Events
            </Typography>
          </Toolbar>
        </AppBar>
        <SwipeableDrawer
          open={this.state.drawerOpen}
          onOpen={this.toggleDrawer}
          onClose={this.toggleDrawer}>
          <FilterForm/>
        </SwipeableDrawer>
        < GridComponent container direction='row' >
          <Hidden mdDown>
            <GridComponent item xs={0} sm={0} md={0} lg={3}>
              <Paper
                style={{
                margin: 8,
                padding: 12
              }}>
                <FilterForm/>
              </Paper>
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
              {totalEvents.map((event, i) => (
                <GridComponent item xs={12} sm={6} md={4} lg={3}>
                  <GridCard
                    handleAttendanceToggle={this.handleAttendanceToggle}
                    onEditChange={this.onEditChange}
                    onEditSubmit={this.onEditSubmit}
                    onDeleteSubmit={this.onDeleteSubmit}
                    onRsvpDelete={this.onRsvpDelete}
                    onRsvpRequest={this.onRsvpRequest}
                    handleRsvpClick={this.handleRsvpClick}
                    event={event}
                    key={i}
                    view={event.host === user.id
                    ? 1
                    : 2}/>
                </GridComponent>
              ))
              }
            </GridComponent>
          </GridComponent>
        </GridComponent>
      </ Grid>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.account.user,
  events: state.account.events,
  userRsvps: state.account.userRsvps,
  rsvps: state.account.rsvps,
  fetching: state.transaction.fetching,
  message: state.transaction.message.message,
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
  rsvpEvent: (eventId) => {
    eventRsvp(eventId, this.props.user.email);
  }

});

export default connect(mapStateToProps, mapDispatchToProps)(NewHome);