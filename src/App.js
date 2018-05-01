import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { myTheme } from './styles/presentationalStyles';
import { TOKEN } from './Constants/action_type';
import { logoutUser, eventSearch, eventFilter } from './actions/accountActions';
import jwt_decode from 'jwt-decode';

const myBgImage = `url(${require('./images/sample.png')})`;

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
    console.log(this.state);
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
      <div className="App" >
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return ({ 
  user: state.account.user, history: ownProps.history, events: state.account.events, userEvents: state.account.userEvents, location: ownProps.location
 });
}

export default connect(mapStateToProps)(App);
