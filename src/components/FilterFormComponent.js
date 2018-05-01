import { Checkbox } from 'material-ui';
import { FormControl } from 'material-ui';
import { FormControlLabel } from 'material-ui';
import { FormGroup } from 'material-ui';
import { FormHelperText } from 'material-ui';
import { FormLabel } from 'material-ui';
import React, { Component } from 'react';

export default class FilterformComponent extends Component {
  render() {
    const {} = this.props;
    return (
      <FormControl style={{
        padding: 12
      }}>
        <FormLabel>Filter events</FormLabel>
        <FormGroup>
          <FormHelperText>User Options</FormHelperText>
          <FormControlLabel
            control={< Checkbox checked = {
            true
          }
          value = 'user events' />}
            label="My Events"/>
          <FormControlLabel
            control={< Checkbox checked = {
            false
          }
          value = 'user rsvps' />}
            label='My Reservations'/>
        </FormGroup>
        <FormGroup>
          <FormHelperText>Events Options</ FormHelperText>
          <FormControlLabel
            control={< Checkbox checked = {
            true
          }
          value = 'Events attending' />}
            label='Reservations attending'/>
          <FormControlLabel
            control={< Checkbox checked = {
            true
          }
          value = 'Events not attending' />}
            label='Reservations not attending'/>
          <FormControlLabel
            control={< Checkbox checked = {
            true
          }
          value = 'Reservations confirmed' />}
            label='Reservations confirmed'/>
          <FormControlLabel
            control={< Checkbox checked = {
            true
          }
          value = 'Reservations canceled' />}
            label='Reservations canceled'/>
        </FormGroup>
      </FormControl>
    );
  }
}
