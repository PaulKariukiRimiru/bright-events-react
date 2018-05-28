import { blue } from '@material-ui/core/colors';
import { ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Switch from '@material-ui/core/Switch';
import { Grid, Row, Col } from 'react-flexbox-grid';

const styles = theme => ({
  avatar: {
    margin: 10,
    backgroundColor: blue[200]
  }
});

/**
 * List item presentational component
 * @class ListItemComponent
 * @extends Component
 */
class ListItemComponent extends Component {
  state = {
    status: true
  }

  componentWillMount() {
    this.setState({ status: this.props.rsvp.accepted });
  }

  handleToggle = () => {
    const { rsvp, onToggleRsvpStatus } = this.props;
    this.setState({
      status: !this.state.status
    });
    onToggleRsvpStatus(rsvp.event_id, !this.state.status, rsvp.email);
  };

  render() {
    const { rsvp, classes } = this.props;
    return (
      <ListItem >
        <Grid fluid>
          <Row>
            <Col xs={4}>
              <ListItemIcon>
                <Avatar className={classes.avatar}>{rsvp
                    .email
                    .substring(0, 1)
                    .toUpperCase()
              }</Avatar>
              </ListItemIcon>
            </Col>
            <Col xs={4}>
              <ListItemText
                primary={rsvp.email}
                secondary={this.state.status
                ? 'Accepted'
                : 'Rejected'}/>
            </Col>
            <Col xs={4}>
              <ListItemSecondaryAction>
                <Switch onChange={this.handleToggle} checked={this.state.status}/>
              </ListItemSecondaryAction>
            </Col>
          </Row>
        </Grid>
      </ListItem>
    );
  }
}
ListItemComponent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ListItemComponent);
