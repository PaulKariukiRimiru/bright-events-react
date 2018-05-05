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
  FormControlLabel,
  Button
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
    editMode: false,
    attendance: false
  }

  cardStyle = {
    maxWidth: 220,
    maxHeight: 280,
    marginLeft: 'auto',
    marginRight: 'auto'
  }

  placeHolderStyle = {
    height: 100,
    backgroundColor: blue[200]
  }

  handleFabClick = () => {}

  componentDidMount() {
    this.setState({ attendance: this.props.event.attendance });
  }

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
    this.setState({ attendance: !this.state.attendance });
    this
      .props
      .handleAttendanceToggle(this.props.event.id, !this.props.event.attendance);
  }

  renderDashboard() {
    const { event } = this.props;
    return (
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
            style={this.placeHolderStyle}/>
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

  renderUserRsvps() {
    const { event } = this.props;
    const { attendance } = this.state;
    return (
      <Card style={{maxWidth: 220}}>
        <CardMedia>
          <div
            style={this.placeHolderStyle}></div>
        </CardMedia>
        <CardContent >
          <Typography variant="display1" component="h2" noWrap={true} style={{ fontSize: 20 }}>
            {event.name}
          </Typography>
          <Typography component='h5'>
            {event.location}
          </Typography>
          <Typography component='h5'>
            {event.category}
          </Typography>
          <Typography component="h6">
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
                  control={< Switch checked = { attendance }
                    onChange = {
                      this.onToggleAttendance
                    }
                    value = "attendance" />}
                  label={attendance
                  ? 'Coming'
                  : 'Not Going'}/>
                </Col>
                <Col xs={4}>
                  <IconButton onClick={this.handleRsvpDelete} aria-label='Delete rsvp'>
                    < Delete />
                  </IconButton>
                </Col>
            </Row>
          </Grid>
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
