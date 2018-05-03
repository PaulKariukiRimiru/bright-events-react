import { Checkbox } from 'material-ui';
import { FormControl } from 'material-ui';
import { FormControlLabel } from 'material-ui';
import { FormGroup } from 'material-ui';
import { FormHelperText } from 'material-ui';
import { FormLabel } from 'material-ui';
import React, { Component } from 'react';
import { Grid } from 'material-ui';

export default class FilterformComponent extends Component {
  render() {
    const {} = this.props;
    return (
      <FormControl style={{
        padding: 12
      }}>
      <Grid container direction='row'>
        <FormGroup>
          <FormLabel>User Options</FormLabel>
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
        < FormLabel > Events Options </ FormLabel>
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
          </FormGroup>
          <FormGroup >
            < FormLabel style={{ marginTop: 16 }}></ FormLabel>
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
        </Grid>
      </FormControl>
    );
  }
}
