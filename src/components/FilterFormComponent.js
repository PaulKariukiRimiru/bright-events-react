
import {
  Grid,
  FormLabel,
  FormGroup,
  FormControlLabel,
  FormControl,
  Radio,
  RadioGroup
} from '@material-ui/core';
import React, { Component } from 'react';

export default class FilterformComponent extends Component {
  state = {
    userEvents: false,
    userRsvps: false,
    allEvents: false,
    eventsAttending: false,
    eventsNotAttending: false,
    rsvpConfirmed: false,
    rsvpCanceled: false,
    value: ''
  }

  onCheckChange = (event, isChecked) => {
    const {
      sortItemsToDisplay
    } = this.props;
    const check = event.target.id;

    this.setState({
      [check]: event.target.checked
    });
    sortItemsToDisplay(event.target.id, isChecked);
  }

  handleChange = (event) => {
    const {
      sortItemsToDisplay
    } = this.props;
    sortItemsToDisplay(event.target.value);
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <FormControl style={{
        padding: 12
      }}>
      <Grid container direction={this.props.direction}>
        <FormGroup>
          <FormControl component="fieldset">
          <FormLabel component="legend">Event Selection</FormLabel>
          <RadioGroup
            aria-label="events"
            name="events"
            value={this.state.value}
            onChange={this.handleChange}>
              <FormControlLabel value="allEvents" control={<Radio />} label="Show all events" />
              <FormControlLabel value="userEvents" control={<Radio />} label="Show only my events" />
              <FormControlLabel value="userRsvps" control={<Radio />} label="Show my reservations" />
            </RadioGroup>
          </FormControl>
          <FormControl component="fieldset" >
            <FormLabel component="legend">Reservations section</FormLabel>
            <RadioGroup
              aria-label="reservations"
              name="reservations"
              value={this.state.value}
              onChange={this.handleChange}>
              <FormControlLabel value="eventsAttending" control={<Radio color="primary" />} label="show events i am attending" />
              <FormControlLabel value="eventsNotAttending" control={<Radio color="primary" />} label="show events i am not attending" />
              <FormControlLabel value="rsvpsConfirmed" control={<Radio color="primary" />} label="show confirmed reservations" />
              <FormControlLabel value="rsvpsCanceled" control={<Radio />} label="show canceled reservations" />
            </RadioGroup>
          </FormControl>
        </FormGroup>
        </Grid>
      </FormControl>
    );
  }
}
