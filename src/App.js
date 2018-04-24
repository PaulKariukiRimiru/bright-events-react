import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import { transparent, white } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import isObjectEmpty from 'is-empty-object';
import { Link } from 'react-router-dom';
import { myTheme } from './styles/presentationalStyles';
import { TextField, IconButton, Dialog, RaisedButton } from 'material-ui';
import SearchIcon from 'material-ui/svg-icons/action/search';
import FilterIcon from 'material-ui/svg-icons/content/filter-list';
import { Row, Col } from 'react-flexbox-grid';
import { TOKEN } from './Constants/action_type';
import { logoutUser, eventSearch, eventFilter } from './actions/accountActions';
import jwt_decode from 'jwt-decode';
import AutoComplete from 'material-ui/AutoComplete';
import DialogComponent from './components/DialogComponent';

class App extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      filterOpen: false,
      search: '',
      locations: [],
      category: [],
      searchform: {}
    };
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleFilter = () => {
    this.setState({ filterOpen: true });
  }

  handleChange = (event) => {
    const myStateCopy = this.state;
    myStateCopy.search = event.target.value;
    return this.setState(myStateCopy);
  }

  onChange = (event) => {
    const myStateCopy = this.state;
    myStateCopy.searchform[event.target.name] = event.target.value;
    return this.setState(myStateCopy);
  }

  handleSubmit = () => {
    const params = {
      q: this.state.search
    };
    this
      .props
      .dispatch(eventSearch(params));
  }

  onFilterSubmit = () => {
    this
      .props
      .dispatch(eventFilter(this.state.searchform));
  }

  logoutUser = (event) => {
    this
      .props
      .dispatch(logoutUser(jwt_decode(localStorage.getItem(TOKEN)).identity.id, this.props.history));
  }

  render() {
    const { user } = this.props;
    const { search, locations, category } = this.state;

    return (

      <MuiThemeProvider muiTheme={myTheme}>
        <DialogComponent
          open={this.state.filterOpen}
          events={this.props.events}
          userEvents={this.props.userEvents}
          handleClose={this.onFilterSubmit}
          view={4}/>
        <div className="App">
          <AppBar
            title="Bright Events"
            iconElementRight={< Toolbar style = {{ backgroundColor: transparent }} > <ToolbarGroup>
            {!localStorage.getItem(TOKEN)
              ? !this.props.location.pathname == '/'
                ? <div>
                    <Link to="/home">
                      <FlatButton
                        name="home"
                        label="Home"
                        style={{
                        color: white
                      }}/>
                    </Link>
                    <Link to="/">
                      <FlatButton
                        name="login"
                        label="Login"
                        style={{
                        color: white
                      }}/>
                    </Link>
                  </div>
                : <div/>
              : <ToolbarGroup >
                <TextField hintText="Search" onChange={this.handleChange}/>
                <IconButton onClick={this.handleSubmit}>
                  <SearchIcon color="#ff6e40"/>
                </IconButton>
                <IconButton onClick={this.handleFilter}>
                  <FilterIcon
                    style={{
                    marginRight: 'auto',
                    marginLeft: 'auto'
                  }}
                    color="#ff6e40"/>
                </IconButton>
                <ToolbarSeparator/>
                <div>
                  <Link to="/home">
                    <FlatButton
                      name="home"
                      label="Home"
                      style={{
                      color: white
                    }}/>
                  </Link>
                  <Link to="/dashboard">
                    <FlatButton
                      name="dashboard"
                      label="dashboard"
                      style={{
                      color: white
                    }}/>
                  </Link>
                  <FlatButton
                    name="logout"
                    label="Logout"
                    style={{
                    color: white
                  }}
                    onClick={this.logoutUser}/>
                </div>
              </ToolbarGroup>}
          </ToolbarGroup> </ Toolbar>}/> {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return ({
    user: state.account.user,
    history: ownProps.history,
    events: state.account.events,
    userEvents: state.account.userEvents,
    location: ownProps.location
  });
}

export default connect(mapStateToProps)(App);
