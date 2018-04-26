import React, {Component} from 'react';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Favorite from 'material-ui/svg-icons/action/favorite';
import FavBorder from 'material-ui/svg-icons/action/favorite-border';
import Delete from 'material-ui/svg-icons/action/delete';
import Edit from 'material-ui/svg-icons/editor/mode-edit';
import Rsvp from 'material-ui/svg-icons/action/stars';
import Save from 'material-ui/svg-icons/content/save';
import {Row} from 'react-flexgrid';
import Col from 'react-flexgrid/lib/Col';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import {white} from 'material-ui/styles/colors';
import {TOKEN} from '../Constants/action_type';
import { Toggle, Checkbox, IconButton } from 'material-ui';

export default class GridItemComponent extends Component {
  state = {
    selected: false,
    editMode: false
  }

  handleFabClick = () => {}

  handleEventDelete = () => {
    this
      .props
      .onDeleteSubmit(this.props.event.id);
  }

  handleRsvpDelete = () => {
    this.props.onRsvpDelete(this.props.event.id);
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
      this.setState({selected: true});
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
    this.props.handleAttendanceToggle(this.props.event.id, !this.props.event.attendance);
  }

  renderDashboard() {
    const { event } = this.props;

    return (
      <Row center="xs">
        <Col xs={10}>
          <Card
            style={{
            maxHeight: 350,
            maxWidth: 280,
            margin: 4
          }}>
            <CardMedia>
              <div
                style={{
                height: 150,
                backgroundImage: `url(${require('../images/guitar.jpg')})`,
                backgroundSize: 'cover'
              }}>
                <CardTitle
                  titleColor='white'
                  subtitleColor='#FAFAFA'
                  style={{
                  textAlign: 'left',
                  position: 'absolute',
                  bottom: '0px'
                }}
                  title={this.state.editMode
                  ? <TextField
                      floatingLabelText="Edit event name"
                      name="name"
                      defaultValue={event.name}
                      onChange={this.props.onEditChange}
                      style={{
                      width: '100%',
                      margin: '12'
                    }}/>
                  : event.name}
                  subtitle={this.state.editMode
                  ? <TextField
                      floatingLabelText="Edit event location"
                      name="location"
                      defaultValue={event.location}
                      onChange={this.props.onEditChange}
                      style={{
                      width: '100%',
                      margin: '12'
                    }}/>
                  : event.location}/>
              </div>
            </CardMedia>
            <CardText style={{
              backgroundColor: white
            }}>

              {this.state.editMode
                ? <div >
                    <TextField
                      floatingLabelText="Edit event category"
                      name="category"
                      defaultValue={event.category}
                      onChange={this.props.onEditChange}
                      style={{
                      width: '100%'
                    }}/>
                    <DatePicker
                      name="time"
                      ref={event.name}
                      hintText={new Date(event.date).toDateString()}
                      onChange={this.props.onEditChange}
                      underlineStyle={{
                      width: 200,
                      color: 'blue'
                    }}/>
                  </div>
                : <h4>
                  {event.time
                    ? new Date(event.time).toDateString()
                    : new Date(event.date).toDateString()}
                </h4>
              }

            </CardText>
            <CardActions style={{
              backgroundColor: white
            }}>

              {this.state.editMode
                ? <Row center="xs" style={{
                    padding: 2
                  }}>
                    <Col xs={4}>
                      <FlatButton onClick={this.handleEditSubmit} icon={< Save color = "#CE93D8" />}/>
                    </Col>
                  </Row>
                : <Row center="xs" style={{
                  padding: 2
                }}>
                  <Col xs={4}>
                    <FlatButton onClick={this.handleRsvpRequest} icon={< Rsvp color = "#FFF59" />}/>
                  </Col>
                  <Col xs={4}>
                    <FlatButton onClick={this.handleEventEdit} icon={< Edit color = "#CE93D8" />}/>
                  </Col>
                  <Col xs={4}>
                    <FlatButton
                      onClick={this.handleEventDelete}
                      icon={< Delete color = "#FFAB91" />}/>
                  </Col>
                </Row>
              }

            </CardActions>
          </Card>
        </Col>
      </Row>
    );
  }

  renderHome() {
    const {event} = this.props;
    return (
      <Row center="xs">
        <Col xs={10}>

          <Card
            style={{
            maxHeight: 300,
            maxWidth: 280,
            margin: 4
          }}>
            <CardMedia>
              <div
                style={{
                height: 150,
                backgroundImage: `url(${require('../images/guitar.jpg')})`,
                backgroundSize: 'cover'
              }}>
                <CardTitle
                  titleColor='white'
                  subtitleColor='#FAFAFA'
                  style={{
                  textAlign: 'left',
                  position: 'absolute',
                  bottom: '0px'
                }}
                  title={event.name}
                  subtitle={event.location}/>
              </div>
            </CardMedia>
            <CardText >
              {event.time
                ? <h4>{new Date(event.time).toDateString()}</h4>
                : <h4>{new Date(event.date).toDateString()}</h4>
              }
            </CardText>
            <CardActions>
              <Row center="xs" style={{
                padding: 2
              }}>
                <Col xs={4}>
                  <FlatButton
                    onClick={this.handleClick}
                    icon={this.state.selected
                    ? <Favorite color="#FF3D00"/>
                    : <FavBorder color="#FF3D00"/>}/>
                </Col>
              </Row>
            </CardActions>
          </Card>
        </Col>
      </Row>
    );
  }

  renderUserRsvps() {
    const { event, handleAttendanceToggle, onEditChange } = this.props;
    const { editMode } = this.state;

    return (
      <Row center="xs">
        <Col xs={10}>
          <Card
            style={{
            maxHeight: 350,
            maxWidth: 280,
            margin: 4
          }}>
            <CardMedia>
              <div
                style={{
                height: 150,
                backgroundImage: `url(${require('../images/guitar.jpg')})`,
                backgroundSize: 'cover'
              }}>
                <CardTitle
                  titleColor='white'
                  subtitleColor='#FAFAFA'
                  style={{
                  textAlign: 'left',
                  position: 'absolute',
                  bottom: '0px'
                }}
                  title={editMode
                  ? <TextField
                      floatingLabelText="Edit event name"
                      name="name"
                      defaultValue={event.name}
                      onChange={onEditChange}
                      style={{
                      width: '100%',
                      margin: '12'
                    }}/>
                  : event.name}
                  subtitle={this.state.editMode
                  ? <TextField
                      floatingLabelText="Edit event location"
                      name="location"
                      defaultValue={event.location}
                      onChange={onEditChange}
                      style={{
                      width: '100%',
                      margin: '12'
                    }}/>
                  : event.location}/>
              </div>
            </CardMedia>
            <CardText style={{
              backgroundColor: white
            }}>

              {editMode
                ? <div >
                    <TextField
                      floatingLabelText="Edit event category"
                      name="category"
                      defaultValue={event.category}
                      onChange={onEditChange}
                      style={{
                      width: '100%'
                    }}/>
                    <DatePicker
                      name="time"
                      ref={event.name}
                      hintText={new Date(event.date).toDateString()}
                      onChange={onEditChange}
                      underlineStyle={{
                      width: 200,
                      color: 'blue'
                    }}/>
                  </div>
                : <h4>
                  {event.time
                    ? new Date(event.time).toDateString()
                    : new Date(event.date).toDateString()}
                </h4>
              }
            </CardText>
            <CardActions style={{
              backgroundColor: white
            }}>
              <Row>
                <Col xs={12}>
                  <Checkbox labelStyle={{ color: '#ff6e40', fontSize: 14 }} iconStyle={{ borderColor: '#ff6e40' }} label={event.accepted ? 'Reservation Accepted' : 'Reservation Declined'} disabled={true} labelPosition='right'/>
                </ Col>
              </ Row>
              <Row middle="xs">
                <Col xs={8}>
                  <Toggle labelStyle={{ fontSize: 14 }} label={event.attendance ? 'Coming' : 'Not Going'} labelPosition='right' defaultToggled={event.attendance} onToggle={this.onToggleAttendance}/>
                </Col>
                <Col xs={4}>
                  <IconButton
                    onClick={this.handleRsvpDelete}
                    tooltip='Delete rsvp'
                    >
                      < Delete color = "#FFAB91" />
                  </IconButton>
                </Col>
              </Row>
            </CardActions>
          </Card>
        </Col>
      </Row>
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
          <div></div>
        );
    }
  }
}
