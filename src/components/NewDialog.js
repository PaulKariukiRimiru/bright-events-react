import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from 'material-ui/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { Tab, Tabs } from '@material-ui/core';
import Person from '@material-ui/icons/Person';
import PersonAdd from '@material-ui/icons/PersonAdd';
import SwipableViews from 'react-swipeable-views';
import Login from './Login';
import Register from './Register';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import StepperComponent from '../components/StepperComponent';
import NewListComponent from '../components/NewListComponent';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class NewDialog extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  }
  handleRegister = (userDetails) => {
    this.props.handleRegister(userDetails);
    this.forceUpdate(() => {
      this.setState({ value: 0 });
    });
  }

  renderAccount = () => {
    const {
      fullScreen,
      openDialog,
      title,
      handleLogin,
      handleClose,
      onChange,
      loading
    } = this.props;
    const { value } = this.state;
    return (
      <MuiThemeProvider>
        <Dialog
          fullScreen={fullScreen}
          open={openDialog && true}
          aria-labelledby={title}
          onClose={handleClose}>
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
      </MuiThemeProvider>
    );
  }

  renderCreateEvent = () => {
    const {
      eventForm,
      onChange,
      handleSubmit,
      title,
      openDialog,
      closeDialog
    } = this.props;
    return (
      <MuiThemeProvider>
        <Dialog
          title={title}
          open={openDialog}
          style={{
            maxWidth: 500,
            marginRight: 'auto',
            marginLeft: 'auto'
          }}
          >
            <StepperComponent
              stepList={eventForm}
              onChange={onChange}
              steps={eventForm.length}
              handleSubmit={handleSubmit}/>
          <DialogActions>
            <Button color='secondary' onClick={closeDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      </MuiThemeProvider>
    );
  }

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
      <MuiThemeProvider>
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
      </MuiThemeProvider>
    );
  }

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

  renderConfirmation = () => {
    const {
      title,
      description,
      open,
      no
    } = this.props;
    return (
      <MuiThemeProvider>
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
        </MuiThemeProvider>
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
