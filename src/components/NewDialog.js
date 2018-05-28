import React from 'react';
import PropTypes from 'prop-types';

import {
  Tab,
  Tabs,
  CircularProgress,
  Fade,
  DialogActions,
  Button,
  DialogContent,
  Dialog,
  DialogTitle,
  DialogContentText,
  withMobileDialog
} from '@material-ui/core';
import Person from '@material-ui/icons/Person';
import PersonAdd from '@material-ui/icons/PersonAdd';
import SwipableViews from 'react-swipeable-views';
import Login from './Login';
import Register from './Register';
import StepperComponent from '../components/StepperComponent';
import NewListComponent from '../components/NewListComponent';
/**
 * Dialog presentational component
 * @class NewDialog
 * @extends React.Component
 */
class NewDialog extends React.Component {
  state = {
    value: 0
  };
  /**
   * handles the change in value
   * @memberof NewDialog
   * @param {Object} event
   * @param {String} value
   * @returns {undefined}
   */
  handleChange = (event, value) => {
    this.setState({ value });
  }
  /**
   * handles register action
   * @memberof NewDialog
   * @param {Object} userDetails
   * @returns {undefined}
   */
  handleRegister = (userDetails) => {
    this.props.handleRegister(userDetails);
    this.forceUpdate(() => {
      this.setState({ value: 0 });
    });
  }
  /**
   * renders the login/register dialog
   * @memberof NewDialog
   * @returns {Node} Dialog
   */
  renderAccount = () => {
    const {
      fullScreen,
      open,
      title,
      handleLogin,
      handleClose,
      onChange,
      loading
    } = this.props;
    const { value } = this.state;
    return (
      <div>
        <Dialog fullScreen={fullScreen} open={open} aria-labelledby={title} onClose={handleClose}>
          <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <Tabs
              value={value}
              onChange={this.handleChange}
              fullWidth
              indicatorColor="secondary"
              textColor="secondary">
              <Tab icon={< Person />} label="LOGIN"/>
              <Tab icon={< PersonAdd />} label="REGISTER"/>
            </Tabs>
            <SwipableViews index={value}>
              <Login handleLogin={handleLogin} onChange={onChange}/>
              <Register handleRegister={this.handleRegister} onChange={onChange}/>
            </SwipableViews>
            <Fade
              in={loading}
              style={{
              transitionDelay: loading
                ? '800ms'
                : '0ms'
            }}
              unmountOnExit>
              <CircularProgress thickness={7}/>
            </Fade>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
  /**
   * renders the create event dialod
   * @memberof NewDialog
   * @returns {Node} Dialog
   */
  renderCreateEvent = () => {
    const {
      eventForm,
      onChange,
      handleSubmit,
      fullScreen,
      title,
      open,
      closeDialog
    } = this.props;
    return (
      <div>
        <Dialog fullScreen={fullScreen} open={open} aria-labelledby={title}>
          <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <StepperComponent
              stepList={eventForm}
              onChange={onChange}
              steps={eventForm.length}
              handleSubmit={handleSubmit}/>
          </DialogContent>
          <DialogActions>
            <Button color='secondary' onClick={closeDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  /**
   * renders the rsvp users list
   * @memberof NewDialog
   * @returns {Node} Dialog
   */
  renderRsvps = () => {
    const {
      fullScreen,
      title,
      open,
      rsvpList,
      onToggleRsvpStatus,
      closeDialog
    } = this.props;
    return (
      <div>
        <Dialog fullScreen={fullScreen} open={open} aria-labelledby={title}>
          <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <NewListComponent
              rsvpList={rsvpList}
              onToggleRsvpStatus={onToggleRsvpStatus}
            />
          </DialogContent>
          <DialogActions>
            <Button color='secondary' onClick={closeDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  /**
   * handles the submition of specific actions according to the action type prop
   * @memberof NewDialog
   * @returns {undefined}
   */
  handleSubmit = () => {
    const {
      actionType, deleteEvent, editEvent, deleteRsvp
    } = this.props;
    switch (actionType) {
      case 'deleteEvent':
        deleteEvent();
        break;
      case 'editEvent':
        editEvent();
        break;
      case 'deleteRsvp':
        deleteRsvp();
        break;
      default:
        break;
    }
  }
  /**
   * renders the alert dialog
   * @memberof NewDialog
   * @returns {Node} Dialog
   */
  renderConfirmation = () => {
    const {
      title,
      description,
      open,
      no
    } = this.props;
    return (
      <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {description}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={no} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Agree
            </Button>
          </DialogActions>
        </Dialog>
    );
  }

  render() {
    switch (this.props.view) {
      case 'account':
        return this.renderAccount();
      case 'createEvent':
        return this.renderCreateEvent();
      case 'rsvpList':
        return this.renderRsvps();
      case 'confirmation':
        return this.renderConfirmation();
      default:
        return <div/>;
    }
  }
}

NewDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired
};

export default withMobileDialog()(NewDialog);
