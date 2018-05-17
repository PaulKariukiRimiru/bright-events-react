import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List, { ListSubheader } from '@material-ui/core/List';
import { blue } from '@material-ui/core/colors';
import ListItem from './ListItemComponent';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  avatar: {
    margin: 10,
    backgroundColor: blue[200]
  },
});

class SwitchListSecondary extends React.Component {
  state = {
    status: true
  };

  render() {
    const { classes, rsvpList, onToggleRsvpStatus } = this.props;

    return (
      <div className={classes.root}>
        <List subheader={< ListSubheader > Reservation list </ListSubheader>}>
        {
          rsvpList.map((rsvp, index) => (
            <ListItem
              key={index}
              rsvp={rsvp}
              onToggleRsvpStatus={onToggleRsvpStatus} />
          ))}
        </List>
      </div>
    );
  }
}

SwitchListSecondary.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SwitchListSecondary);
