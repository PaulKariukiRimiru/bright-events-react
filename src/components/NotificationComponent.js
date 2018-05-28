import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4
  }
});

class NotificationComponent extends React.Component {
  state = {
    open: false,
    messageInfo: {}
  };

  queue = [];

  componentWillReceiveProps(nextProps) {
    if (nextProps.message !== this.props.message) {
      this.handleMessage(nextProps.message);
    }
  }

  componentDidMount() {
    this.handleMessage(this.props.message);
  }

  handleMessage = (message) => {
    this
      .queue
      .push({
        message,
        key: new Date().getTime()
      });

    if (this.state.open) {
      // immediately begin dismissing current message to start showing new one
      this.setState({ open: false });
    } else {
      this.processQueue();
    }
  };

  processQueue = () => {
    if (this.queue.length > 0) {
      this.setState({
        messageInfo: this
          .queue
          .shift(),
        open: true
      });
    }
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
  };

  handleExited = () => {
    this.processQueue();
  };

  render() {
    const { classes } = this.props;
    const { message, key } = this.state.messageInfo;
    return (
      <div>
        <Snackbar
          key={key}
          anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
          }}
          open={this.state.open}
          autoHideDuration={3000}
          onClose={this.handleClose}
          onExited={this.handleExited}
          snackbarcontentprops={{
          'aria-describedby': 'message-id'
          }}
          message={<span id = "message-id" > {message} </span>}
          action={[<IconButton key="close" aria-label="Close" color="inherit" className={classes.close} onClick={this.handleClose}> <CloseIcon/> </IconButton>]}
        />
      </div>
    );
  }
}

NotificationComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired
};

export default withStyles(styles)(NotificationComponent);
