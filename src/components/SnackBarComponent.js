import React, { Component } from 'react';
import SnackBar from 'material-ui/Snackbar';

export default class SnackBarComponent extends Component {
  render() { 
    return (
      <SnackBar
        open={this.props.open}
        message={this.props.message}
        action={this.props.action}
        onActionClick={this.props.onActionClick}
        autoHideDuration={3000}
        onRequestClose={this.props.handleRequestClose}
        />
    );
  };
};
