import { List } from '@material-ui/core/List';
import { Subheader } from '@material-ui/core';
import React, { Component } from 'react';

import ListItemComponent from './ListItemComponent';
/**
 * List presentational component
 * @export
 * @class ListComponent
 * @extends Component
 */
export default class ListComponent extends Component {
  render() {
    return (
      <div >
        <List >
          <Subheader>
            Users attending
          </Subheader>
          {this
            .props
            .rsvpList
            .map((rsvp, index) => (<ListItemComponent
              key={index}
              rsvp={rsvp}
              onToggleRsvpStatus={this.props.onToggleRsvpStatus}/>))}
        </List>
      </div>
    );
  }
}
