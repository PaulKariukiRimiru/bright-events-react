import React from 'react';
import PropTypes from 'prop-types';
import Dialog, { DialogContent, DialogTitle, withMobileDialog } from 'material-ui/Dialog';
import { Tab, Tabs } from 'material-ui';
import Person from '@material-ui/icons/Person';
import PersonAdd from '@material-ui/icons/PersonAdd';
import SwipableViews from 'react-swipeable-views';
import Login from './Login';
import Register from './Register';
import { CircularProgress, Fade } from 'material-ui';
import StepperComponent from '../components/StepperComponent';

class NewDialog extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  }

  renderAccount = () => {
    const {
      fullScreen,
      open,
      title,
      handleLogin,
      handleRegister,
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
              <Register handleRegister={handleRegister} onChange={onChange}/>
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
      open
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
        </Dialog>
      </div>
    );
  }

  render() {
    switch (this.props.view) {
      case 'account':
        return this.renderAccount();
      case 'createEvent':
        return this.renderCreateEvent();
      default:
        return <div/>;
    }
  }
}

NewDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired
};

export default withMobileDialog()(NewDialog);
