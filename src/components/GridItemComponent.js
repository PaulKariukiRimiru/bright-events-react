import React, { Component } from 'react';
import { TOKEN } from '../Constants/action_type';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  TextField,
  Checkbox,
  Switch,
  FormControlLabel
} from 'material-ui';
import Save from '@material-ui/icons/Save';
import Ticket from '@material-ui/icons/PlusOne';
import RsvpList from '@material-ui/icons/Group';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import { Row, Col, Grid } from 'react-flexbox-grid';
import { blue } from 'material-ui/colors';

export default class GridItemComponent extends Component {
  state = {
    selected: false,
    editMode: false
  }

  cardStyle = {
    maxWidth: 260,
    marginLeft: 'auto',
    marginRight: 'auto'
  }

  handleFabClick = () => {}

  handleEventDelete = () => {
    this
      .props
      .onDeleteSubmit(this.props.event.id);
  }

  handleRsvpDelete = () => {
    this
      .props
      .onRsvpDelete(this.props.event.id);
  }

  handleEventEdit = () => {
    this.setState({
      editMode: !this.state.editMode
    });
  }

  handleEditSubmit = () => {
    this.setState({
      editMode: !this.state.editMode
    });
    this
      .props
      .onEditSubmit(this.props.event.id);
  }

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

  handleRsvpRequest = () => {
    this
      .props
      .onRsvpRequest(this.props.event.id);
  }

  onToggleAttendance = () => {
    this
      .props
      .handleAttendanceToggle(this.props.event.id, !this.props.event.attendance);
  }

  renderDashboard() {
    const { event } = this.props;
    return (
      <Card style={this.cardStyle}>
        <CardMedia>
          <div
            style={{
            height: 150,
            backgroundImage: `url(${require('../images/guitar.jpg')})`,
            backgroundSize: 'cover'
          }}></div>
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
              <Typography gutterBottom variant="display1" component="h2" noWrap={true}>
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
                  <IconButton color='#CE93D8' aria-label='save' onClick={this.handleEditSubmit}>
                    <Save/>
                  </IconButton>
                </Col>
              </Row>
            : <Row center="xs" style={{
              padding: 2
            }}>
              <Col xs={4}>
                <IconButton
                  onClick={this.handleRsvpRequest}
                  color="#FFF59"
                  aria-label='Reservation list'>
                  <RsvpList/>
                </IconButton>
              </Col>
              <Col xs={4}>
                <IconButton
                  onClick={this.handleEventEdit}
                  color="#CE93D8"
                  aria-label='Edit Event'>
                  <Edit/>
                </IconButton>
              </Col>
              <Col xs={4}>
                <IconButton
                  onClick={this.handleEventDelete}
                  color="#FFAB91"
                  aria-label='Delete Event'>
                  <Delete/>
                </IconButton>
              </Col>
            </Row>
}
        </CardActions>
      </Card>
    );
  }

  renderHome() {
    const { event } = this.props;
    return (
      <Card style={this.cardStyle}>
        <CardMedia>
          <div
            style={{
            height: 100,
            backgroundColor: blue[400]
          }}/>
        </CardMedia>
        <CardContent >

          <Typography gutterBottom variant="headline" component="h2" noWrap={true}>
            {event.name}
          </Typography>
          <Typography component="p">
            Happening at {event.location} On {event.time
              ? new Date(event.time).toDateString()
              : new Date(event.date).toDateString()}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton
            onClick={this.handleClick}
            style={{
            marginLeft: 'auto',
            marginRight: 'auto'
          }}
            color='#FF3D00'
            aria-label='Reserve event'>
            <Ticket/>
          </IconButton>
        </CardActions>
      </Card>
    );
  }

  renderUserRsvps() {
    const { event } = this.props;

    return (
      <Card style={this.cardStyle}>
        <CardMedia>
          <div
            style={{
            height: 150,
            backgroundImage: `url(${require('../images/guitar.jpg')})`,
            backgroundSize: 'cover'
          }}></div>
        </CardMedia>
        <CardContent >
          <Typography gutterBottom variant="headline" component="h2" noWrap={true}>
            {event.name}
          </Typography>
          <Typography component='h5'>
            {event.location}
          </Typography>
          <Typography component='h5'>
            {event.category}
          </Typography>
          <Typography component="h6">
            {event.time
              ? new Date(event.time).toDateString()
              : new Date(event.date).toDateString()
}
          </Typography>
        </CardContent>
        <CardActions >
          <Row>
            <Col xs={12}>
              <Checkbox
                label={event.accepted
                ? 'Reservation Accepted'
                : 'Reservation Declined'}
                disabled={true}/>
            </ Col>
          </ Row>
          <Row middle="xs">
            <Col xs={8}>
              <FormControlLabel
                control={< Switch checked = {
                event.attendance
              }
              onChange = {
                this.onToggleAttendance
              }
              value = "attendance" />}
                label={event.attendance
                ? 'Coming'
                : 'Not Going'}/>
            </Col>
            <Col xs={4}>
              <IconButton onClick={this.handleRsvpDelete} aria-label='Delete rsvp'>
                < Delete color="#FFAB91"/>
              </IconButton>
            </Col>
          </Row>
        </CardActions>
      </Card>
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
