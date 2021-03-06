import {
  Avatar,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  TextField,
  Checkbox,
  Switch,
  FormControlLabel,
  Button
} from '@material-ui/core';
import Save from '@material-ui/icons/Save';
import RsvpList from '@material-ui/icons/Group';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import { Row, Col, Grid } from 'react-flexbox-grid';
import Close from '@material-ui/icons/Close';

import AccountCheck from 'mdi-material-ui/AccountCheck';
import React, { Component } from 'react';
import { TOKEN } from '../Constants/action_type';
import NewDialog from './NewDialog';


/**
 * Grid item presentational component
 * @export
 * @class GridItemComponent
 * @extends Component
 */
export default class GridItemComponent extends Component {
  state = {
    selected: false,
    editMode: false,
    attendance: false,
    open: false,
    title: '',
    description: '',
    actionType: ''
  }

  cardStyle = {
    maxWidth: 220,
    maxHeight: 280,
    marginLeft: 'auto',
    marginRight: 'auto'
  }

  placeHolderStyle = {
    height: 100,
    backgroundColor: '#6d6d6d'
  }
  /**
   * handles the toggle of edit mode on component
   * @memberof GridItemComponent
   * @returns {void}
   */
  handleEditClose = () => {
    this.setState({
      editMode: false
    });
  }
  /**
   * handles event deletion
   * @memberof GridItemComponent
   * @returns {void}
   */
  handleEventDelete = () => {
    this
      .props
      .onDeleteSubmit(this.props.event.id);
    this.setState({
      open: false
    });
  }
  /**
   * handles rsvp deletion
   * @memberof GridItemComponent
   * @returns {void}
   */
  handleRsvpDelete = () => {
    this
      .props
      .onRsvpDelete(this.props.event.id);
    this.setState({
      open: false
    });
  }
  /**
   * toggles event editmode
   * @memberof GridItemComponent
   * @returns {void}
   */
  handleEventEdit = () => {
    this.setState({
      editMode: !this.state.editMode
    });
  }
  /**
   * handles event edit
   * @memberof GridItemComponent
   * @returns {void}
   */
  handleEditSubmit = () => {
    this.setState({
      editMode: !this.state.editMode,
      open: false
    });
    this
      .props
      .onEditSubmit(this.props.event.id);
  }
  /**
   * handles event delete confirmation
   * @memberof GridItemComponent
   * @returns {void}
   */
  confirmDelete = () => {
    this.setState({
      open: true,
      title: 'Confirm action',
      actionType: 'deleteEvent',
      description: 'Are you sure you want to delete this event?'
    });
  }
  /**
   * handles event edit confirmation
   * @memberof GridItemComponent
   * @returns {void}
   */
  confirmEdit = () => {
    this.setState({
      open: true,
      title: 'Confirm action',
      actionType: 'editEvent',
      description: 'Are you sure you want to edit this event?'
    });
  }
  /**
   * handles rsvp delete confirmation
   * @memberof GridItemComponent
   * @returns {void}
   */
  confirmDeleteRsvp = () => {
    this.setState({
      open: true,
      title: 'Confirm action',
      actionType: 'deleteRsvp',
      description: 'Are you sure you want to delete this reservation?'
    });
  }
  /**
   * handles rsvp request
   * @memberof GridItemComponent
   * @returns {void}
   */
  handleClick = () => {
    if (localStorage.getItem(TOKEN)) {
      this.setState({ selected: true });
      this
        .props
        .handleRsvpClick(this.props.event.id);
    } else {
      this
        .props
        .handleMessage('please login first to reserve an event');
    }
  }
  /**
   * handles rsvp request
   * @memberof GridItemComponent
   * @returns {void}
   */
  handleRsvpRequest = () => {
    this
      .props
      .onRsvpRequest(this.props.event.id);
  }
  /**
   * handles toggle attendance submition
   * @memberof GridItemComponent
   * @param {Object} event
   * @param {Boolean} checked
   * @returns {void}
   */
  onToggleAttendance = (event, checked) => {
    this.setState({ attendance: checked });
    this
      .props
      .handleAttendanceToggle(this.props.event.id, !this.props.event.attendance);
  }
  /**
   * handles closing of confirmation dialog
   * @memberof GridItemComponent
   * @returns {void}
   */
  handeDialogClose = () => {
    this.setState({
      open: false
    });
  }
  /**
   * Renders dashboard components
   * @memberof GridItemComponent
   * @returns {void}
   */
  renderDashboard() {
    const { event } = this.props;
    const {
      open, title, description, actionType
    } = this.state;
    return (
      <div>
      <Card style={{ ...this.cardStyle, maxHeight: 330 }}>
        <CardMedia>
          <div
            style={this.placeHolderStyle}></div>
        </CardMedia>

        <CardContent >
          {this.state.editMode
            ? <div>
                <TextField
                  floatingLabelText="Edit event name"
                  name="name"
                  defaultValue={event.name}
                  onChange={this.props.onEditChange}
                  style={{
                  width: '100%',
                  margin: '12'
                }}/>
                <TextField
                  floatingLabelText="Edit event location"
                  name="location"
                  defaultValue={event.location}
                  onChange={this.props.onEditChange}
                  style={{
                  width: '100%',
                  margin: '12'
                }}/>
                <TextField
                  floatingLabelText="Edit event category"
                  name="location"
                  defaultValue={event.category}
                  onChange={this.props.onEditChange}
                  style={{
                  width: '100%',
                  margin: '12'
                }}/>
                <TextField
                  id="time"
                  label="Date"
                  type="date"
                  defaultValue="2017-05-24"
                  InputLabelProps={{
                  shrink: true
                }}/>
              </div>
            : <div>
              <Typography gutterBottom variant="display1" component="h2" noWrap={true} style={{ fontSize: 20 }}>
                {event.name}
              </Typography>
              <Typography component='subheading'>
                {event.location}
              </Typography>
              <Typography component='subheading'>
                {event.category}
              </Typography>
              <Typography component="body1">
                {event.time
                  ? new Date(event.time).toDateString()
                  : new Date(event.date).toDateString()
                }
              </Typography>
            </div>
          }
        </CardContent>
        <CardActions>

          {this.state.editMode
            ? <Row center="xs" style={{
                padding: 2
              }}>
                <Col xs={4}>
                  <IconButton aria-label='save' onClick={this.confirmEdit}>
                    <Save/>
                  </IconButton>
                </Col>
                <Col xs={4}>
                  <IconButton aria-label='close' onClick={this.handleEditClose}>
                    <Close/>
                  </IconButton>
                </Col>
              </Row>
            : <Row center="xs" style={{
              padding: 2
            }}>
              <Col xs={4}>
                <IconButton
                  onClick={this.handleRsvpRequest}
                  aria-label='Reservation list'>
                  <RsvpList/>
                </IconButton>
              </Col>
              <Col xs={4}>
                <IconButton
                  onClick={this.handleEventEdit}
                  aria-label='Edit Event'>
                  <Edit/>
                </IconButton>
              </Col>
              <Col xs={4}>
                <IconButton
                  onClick={this.confirmDelete}
                  aria-label='Delete Event'>
                  <Delete/>
                </IconButton>
              </Col>
            </Row>
          }
        </CardActions>
      </Card>
      { open &&
      <NewDialog
        open={open}
        view='confirmation'
        title={title}
        description={description}
        actionType={actionType}
        deleteRsvp = {this.handleRsvpDelete}
        editEvent = {this.handleEditSubmit}
        deleteEvent = {this.handleEventDelete}
        no={this.handeDialogClose}
      />
      }
      </div>
    );
  }
  /**
   * Renders general events components
   * @memberof GridItemComponent
   * @returns {void}
   */
  renderHome() {
    const { event, isReserved } = this.props;
    return (
      <Card style={this.cardStyle}>
        <CardMedia>
          <div
            style={this.placeHolderStyle}>
            {isReserved &&
            <div>
              <Avatar style={{
                    height: 75,
                    width: 75,
                    color: '#FF9671',
                    margin: 'auto',
                    backgroundColor: 'inherit'
                  }}>
                <AccountCheck
                />
              </Avatar>
              <Typography
                style={{
                  textAlign: 'center',
                  color: '#FF9671'
                }}
                variant='caption'
                >you already reserved this event </Typography>
            </div>
            }
          </div>
        </CardMedia>
        <CardContent >

          <Typography variant="display1" component="h2" noWrap={true} style={{ fontSize: 20 }}>
            {event.name}
          </Typography>
          <Typography component="p">
            Happening at <br />{event.location} On <br/>{event.time
              ? new Date(event.time).toDateString()
              : new Date(event.date).toDateString()}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={this.handleClick}
            disabled={isReserved}
            style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 9,
            marginBottom: 1
          }}
            aria-label='Reserve event'>
            Reserve event
          </Button>
        </CardActions>
      </Card>
    );
  }
  /**
   * renders users Rsvps
   * @memberof GridItemComponent
   * @returns {void}
   */
  renderUserRsvps() {
    const { event } = this.props;
    const {
      open, title, description, actionType
    } = this.state;
    return (
      <div>
        <Card style={{ maxWidth: 220 }}>
          <CardMedia>
            <div
              style={this.placeHolderStyle}></div>
          </CardMedia>
          <CardContent >
            <Typography variant='display1' component='h2' noWrap={true} style={{ fontSize: 20 }}>
              {event.name}
            </Typography>
            <Typography component='h5'>
              {event.location}
            </Typography>
            <Typography component='h5'>
              {event.category}
            </Typography>
            <Typography component='h6'>
              {
                event.time
                ? new Date(event.time).toDateString()
                : new Date(event.date).toDateString()
              }
            </Typography>
          </CardContent>
          <CardActions >
            <Grid fluid>
              <Row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={event.accepted}
                      disabled={true}
                    />
                  }
                  label = {
                    event.accepted ?
                    'Reservation Accepted' :
                      'Reservation Declined'
                  }
                />
              </Row>
              <Row>
                <Col xs={8}>
                  <FormControlLabel
                    control={
                      < Switch checked = { event.attendance }
                        onChange = { this.onToggleAttendance }
                        value = "attendance" />
                    }
                    label={ event.attendance
                    ? 'Coming'
                    : 'Not Going'}/>
                  </Col>
                  <Col xs={4}>
                    <IconButton onClick={this.confirmDeleteRsvp} aria-label='Delete rsvp'>
                      < Delete />
                    </IconButton>
                  </Col>
              </Row>
            </Grid>
          </CardActions>
        </Card>
        { open &&
          <NewDialog
            open={open}
            view='confirmation'
            title={title}
            description={description}
            actionType={actionType}
            deleteRsvp = {this.handleRsvpDelete}
            editEvent = {this.handleEditSubmit}
            deleteEvent = {this.handleEventDelete}
            no={this.handeDialogClose}
          />
        }
      </div>
    );
  }

  render() {
    switch (this.props.view) {
      case 1:
        return this.renderDashboard();
      case 2:
        return this.renderHome();
      case 3:
        return this.renderUserRsvps();
      default:
        return (
          <Grid fluid/>
        );
    }
  }
}
