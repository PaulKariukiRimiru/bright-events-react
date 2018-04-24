import {connect} from 'react-redux';

import {
  FloatingActionButton,
  BottomNavigation,
  BottomNavigationItem,
  Tab,
  Tabs,
  Card,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui';
import {Grid} from 'react-flexgrid';
import {MuiThemeProvider} from 'material-ui/styles';
import {Row, Col} from 'react-flexbox-grid';
import ContentAdd from 'material-ui/svg-icons/content/add';
import React, {Component} from 'react';
import SwipeableViews from 'react-swipeable-views';

import {checkList} from '../Constants/common-functions';
import DialogComponent from '../components/DialogComponent';
import GridComponent from '../components/GridComponent';

import {
  eventPost,
  eventsGet,
  eventEdit,
  eventDelete,
  eventRsvpGet,
  eventManageRsvp,
  userRsvpsGet,
  userAttendanceChange
} from '../actions/accountActions';
import isObjectEmpty from 'is-empty-object';
import SnackBarComponent from '../components/SnackBarComponent';
import {dismissMessageAction} from '../actions/index';
import jwt_decode from 'jwt-decode';
import {TOKEN} from '../Constants/action_type';
import {myTheme, dashboardStyles} from '../styles/presentationalStyles';
import FavoriteIcon from 'material-ui/svg-icons/action/favorite';
import HomeIcon from 'material-ui/svg-icons/action/home';
import FontIcon from 'material-ui/FontIcon/FontIcon';
import {white} from 'material-ui/styles/colors';
import Overlay from 'material-ui/internal/Overlay';

function mapStateToProps(state, ownProps) {
  return ({
    user: state.account.user,
    events: state.account.userEvents,
    userRsvps: state.account.userRsvps,
    rsvps: state.account.rsvps,
    fetching: state.transaction.fetching,
    message: state.transaction.message.message,
    displayed: state.transaction.message.status,
    history: ownProps.history
  });
}

const myBgImage = `url(${require('../images/background.jpg')})`;

const spanStyle = {
  marginTop: '15%',
  fontFamily: 'Roboto',
  wordSpacing: 4,
  lineHeight: 2,
  fontSize: 24
};

const cardMediaStyle = {
  height: 500,
  backgroundImage: myBgImage,
  backgroundSize: 'cover',
  marginTop: 16
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
export class DashBoard extends Component {
  constructor() {
    super();
    this.state = {
      showDialog: false,
      editForm: {},
      view: 1,
      selectedIndex: 1,
      tabValue: 0
    };
  }

  renderGrid = () => {
    const fabstyling = {
      position: 'relative',
      bottom: 0,
      right: 0,
      margin: 32
    };
    return (
      <div >
        <DialogComponent
          onToggleRsvpStatus={this.onToggleRsvpStatus}
          rsvpList={this.props.rsvps}
          handleSubmit={this.onFinish}
          eventsFields={fields}
          onChange={this.onChange}
          handleClose={this.handleClose}
          open={this.state.showDialog}
          view={this.state.view}/>
        <Grid fluid>
          <Row center="xs">
            <Col xs={12}></Col>
          </Row>
        </Grid>

        <SnackBarComponent
          open={this.props.displayed}
          handleRequestClose={this.handleRequestClose}
          message={this.props.message}/>
      </div>
    );
  }

  renderEmpty = () => {
    const styling = {
      marginTop: '25%'
    };
    return (
      <div>

        <Grid fluid>
          <Row center="xs" style={styling}>
            <Col xs={10}>
              <Row center="xs">
                <Col xs={10}>
                  <h4>Sorry, you do not have any events, create some</h4>
                </Col>
              </Row>
              <Row center="xs">
                <Col xs={1}>
                  <FloatingActionButton secondary={true} onClick={this.handleFabClick}>
                    <ContentAdd/>
                  </FloatingActionButton>
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }

  renderProfile = () => {}

  componentWillMount() {
    this
      .props
      .dispatch(userRsvpsGet());
  }

  handleRequestClose = () => {
    this
      .props
      .dispatch(dismissMessageAction());
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
      .dispatch(eventDelete(eventId));
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
        .dispatch(eventEdit(id, this.state.editForm));
      this.setState({ editForm: {} });
    }
  }

  onRsvpRequest = (id) => {
    this
      .props
      .dispatch(eventRsvpGet(id));
    this.setState({ showDialog: true, view: 3 });
  }

  onToggleRsvpStatus = (id, status, email) => {
    const details = {
      accept_status: status,
      client_email: email
    };
    this
      .props
      .dispatch(eventManageRsvp(id, details));
  }

  onFinish = (eventDetails) => {
    this.setState({ showDialog: false });

    eventDetails.host = this.props.user.id
      ? this.props.user.id
      : jwt_decode(localStorage.getItem(TOKEN)).identity.id;
    eventDetails.token = localStorage.getItem(TOKEN);
    this
      .props
      .dispatch(eventPost(eventDetails));
  }

  handleTabChange = (value) => {
    this.setState({ tabValue: value });
  }

  handleAttendanceToggle = (eventId, attendance) => {
    this.props.dispatch(userAttendanceChange({ event_id: eventId, attendance }));
  }

  render() {
    const {
      rsvps,
      user,
      events,
      actions,
      displayed,
      message,
      userRsvps
    } = this.props;
    const { tabValue, showDialog, view } = this.state;
    return (
      <MuiThemeProvider muiTheme={myTheme}>
        <DialogComponent
          view={view}
          rsvpList={this.props.rsvps}
          eventsFields={fields}
          onChange={this.onChange}
          handleClose={this.handleClose}
          open={this.state.showDialog}
          handleSubmit={this.onFinish}/>
        <Tabs value={tabValue} onChange={this.handleTabChange}>
          <Tab
            icon={< FontIcon className = "material-icons" > person </FontIcon >}
            value={0}
            label='Profile'/>
          <Tab
            icon={< FontIcon className = "material-icons" > event </FontIcon>}
            value={1}
            label='My Events'/>
        </ Tabs>

        <SwipeableViews index={this.state.tabValue}>
          < Grid fluid>
            <Row>
              <Col xs={4}>
                <Row center='xs'>
                  <Col xs={12}>
                    <Card >
                      <CardMedia
                        overlay=
                        { < CardTitle title = { user.username ? user.username : 'username' } subtitle = { user.email ? user.email : 'email' } /> } >
                        <div style={cardMediaStyle}/>
                      </CardMedia>
                    </Card>
                  </ Col>
                </ Row>
              </ Col>
              <Col xs={8}>
                {userRsvps
                  ? <GridComponent
                      itemList={userRsvps}
                      itemClickAction={actions}
                      view={3}
                      col={3}
                      handleAttendanceToggle={this.handleAttendanceToggle}
                      onEditChange={this.onEditChange}
                      onEditSubmit={this.onEditSubmit}
                      onDeleteSubmit={this.onDeleteSubmit}
                      onRsvpRequest={this.onRsvpRequest}/>
                  : this.renderEmpty
                }
              </ Col>
            </Row>
          </ Grid>
        </SwipeableViews >
        <FloatingActionButton
          secondary={true}
          onClick={this.handleFabClick}
          style={{
          position: 'fixed',
          bottom: '45px',
          right: '24px'
        }}>
          <ContentAdd/>
        </FloatingActionButton>
        <SnackBarComponent
          open={displayed}
          handleRequestClose={this.handleRequestClose}
          message={message}/>
      </MuiThemeProvider>
    );
  }
}

export default connect(mapStateToProps)(DashBoard);
