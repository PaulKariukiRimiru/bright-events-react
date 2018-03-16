import React, { Component } from 'react';
import AppBar  from 'material-ui/AppBar';
import NavigationComponent from './components/NavigationComponent';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {

  constructor(){
    super();
    this.state = {
      open : false
    }
  }

  handleClick(){
    this.setState({
      open:!this.state.open
    })
  }

  handleClose(){
    this.setState({
      open: false
    })
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App" >
          <AppBar 
            title="Bright Events"
            iconClassNameRight="muidocs-icon-navigationimport MuiThemeProvider from 'material-ui/styles/MuiThemeProvider" 
            onLeftIconButtonClick={this.handleClick.bind(this)} />
          <NavigationComponent open={this.state.open} handleToggle={this.handleClose.bind(this)} />
          { this.props.children }
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
