import React from 'react';
import PropTypes from 'prop-types';
import Dialog, {
  DialogContent,
  DialogTitle,
  DialogContentText,
  withMobileDialog
} from 'material-ui/Dialog';
import { Tab, Tabs } from 'material-ui';
import Person from '@material-ui/icons/Person';
import PersonAdd from '@material-ui/icons/PersonAdd';
import SwipableViews from 'react-swipeable-views';
import Login from './Login';
import Register from './Register';
import { CircularProgress, Fade } from 'material-ui';
import StepperComponent from '../components/StepperComponent';
import NewListComponent from '../components/NewListComponent';
import { DialogActions } from 'material-ui';
import { Button } from 'material-ui';

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
      open,
      title,
      handleLogin,
      onChange,
      loading
    } = this.props;
    const { value } = this.state;
    return (
      <div>
        <Dialog fullScreen={fullScreen} open={open} aria-labelledby={title}>
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

  renderConfirmation = () => {
    const {
      title,
      description,
      open,
      yes,
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
            <Button onClick={yes} color="primary">
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
