import React, { Component } from 'react';
import AppBar  from 'material-ui/AppBar';
import LandingPage from './pages/LandingPage';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App" >
          <AppBar 
            title="Bright Events"
            iconClassNameRight="muidocs-icon-navigationimport MuiThemeProvider from 'material-ui/styles/MuiThemeProvider" />
          <LandingPage />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
