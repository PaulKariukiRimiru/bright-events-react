import React, { Component } from 'react';
import SnackBar from 'material-ui/Snackbar';

export default class SnackBarComponent extends Component {
  render() {
    return (
      <SnackBar
        open={this.props.open}
        message={this.props.message}
        autoHideDuration={3000}
        onRequestClose={this.props.handleRequestClose}
        style={{marginBottom: 200}}
        />
    );
  };
};
