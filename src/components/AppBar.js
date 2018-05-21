import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Hidden from '@material-ui/core/Hidden';
import isObjectEmpty from 'is-empty-object';

const styles = {
  menuButton: {
    marginLeft: -12,
    marginRight: 8
  }
};

const MyAppBar = (props) => {
  const {
    classes, openDrawer, showAccountDialog, logout, user
  } = props;
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
        {
          !isObjectEmpty(user) ?
          <div style={{
                marginLeft: 'auto',
                marginRight: 4
              }}>
            <Button
              color="inherit"
              aria-label='Account options'>
              <AccountCircle style={{ marginRight: 4 }}/>
              {user.username}
            </Button>
            <Hidden mdDown>
              <Button color='inherit' aria-label='Account options' onClick={logout}>
                Logout
              </Button>
            </Hidden>
          </div> :
          <IconButton
              color='inherit'
              aria-label='Account'
              style={{
                marginLeft: 'auto',
                marginRight: 8
              }}
              onClick={showAccountDialog}>
              <AccountCircle />
          </IconButton>
        }
      </Toolbar>
    </AppBar>
  );
};

MyAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MyAppBar);
