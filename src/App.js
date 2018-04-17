import React, { Component } from 'react';
import AppBar  from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Toolbar, ToolbarGroup, ToolbarSeparator} from 'material-ui/Toolbar';
import {transparent, white} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import isObjectEmpty from 'is-empty-object';
import { Link } from 'react-router-dom';
import { myTheme } from './styles/presentationalStyles';
import { TextField, IconButton } from 'material-ui';
import SearchIcon from 'material-ui/svg-icons/action/search';
import { Row, Col } from 'react-flexbox-grid';
import { TOKEN } from './Constants/action_type';
import { logoutUser, eventSearch } from './actions/accountActions';
import jwt_decode from 'jwt-decode';
class App extends Component {

  constructor(){
    super();
    this.state = {
      open : false,
      search: ''
    }
  }


  handleClose(){
    this.setState({
      open: false
    })
  }

  handleChange = (event) => {
    let myStateCopy = this.state
    myStateCopy.search = event.target.value;
    return this.setState(myStateCopy);
  }

  handleSubmit = () => {
    const params = {
      'q':this.state.search
    }
    this.props.dispatch(eventSearch(params))
  }

  logoutUser = (event) => {
    this.props.dispatch(
      logoutUser(
        this.props.user ? 
        this.props.user.id : 
        jwt_decode(localStorage.getItem(TOKEN)).identity.id), 
      this.props.history
      )
  }

  render() {

    const { user } = this.props;
    const { search } = this.state;

    return (
      
      <MuiThemeProvider muiTheme={myTheme}>
        <div className="App">
          <AppBar 
            title="Bright Events"
            iconElementRight={
              <Toolbar style={{backgroundColor:transparent}} >
                <ToolbarGroup>
                  {
                    isObjectEmpty(user)&&!localStorage.getItem(TOKEN) ? 
                    <div>
                      <Link to="/home">
                        <FlatButton
                          name="home"
                          label="Home"
                          style={{color: white}}/>
                      </Link>
                      <Link to="/">
                        <FlatButton
                          name="login"
                          label="Login"
                          style={{color: white}}/>
                      </Link>
                    </div>
                    : 
                    <ToolbarGroup >
                      <TextField 
                        hintText="Search"
                        onChange={this.handleChange}
                        />
                      <IconButton onClick={this.handleSubmit}>
                        <SearchIcon color="#ff6e40"/>
                      </IconButton>
                      <ToolbarSeparator />
                      <div>
                        <Link to="/home">
                          <FlatButton
                            name="home"
                            label="Home"
                            style={{color: white}}/>
                        </Link>
                        <Link to="/dashboard" >
                          <FlatButton
                            name="dashboard"
                            label="dashboard"
                            style={{color: white}}/>
                        </Link>
                        <FlatButton
                          name="logout"
                          label="Logout"
                          style={{color: white}}
                          onClick={this.logoutUser}/>
                      </div>
                    </ToolbarGroup> 
                  }
                </ToolbarGroup>
              </Toolbar>
            }
             />
          { this.props.children }
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps (state, ownProps){
  return({
    user: state.account.user,
    history: ownProps.history
  })
}

export default connect(mapStateToProps)(App)