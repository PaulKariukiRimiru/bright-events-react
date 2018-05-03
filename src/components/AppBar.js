import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Hidden from 'material-ui/Hidden';

const styles = {
  menuButton: {
    marginLeft: -12,
    marginRight: 8
  }
};

const MyAppBar = (props) => {
  const {classes, openDrawer, showAccountDialog } = props;
  return (
    <AppBar position="static">
      <Toolbar>
        <Hidden lgUp>
          <IconButton
            onClick={openDrawer}
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu">
            <MenuIcon/>
          </IconButton>
        </Hidden>
        <Typography variant="title" color="inherit">
          Bright Events
        </Typography>
        <IconButton
          style={{
          marginLeft: 'auto',
          marginRight: 8
        }}
          color="inherit"
          aria-label='Account options'
          onClick={showAccountDialog}>
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

MyAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MyAppBar);
