import React, { Component } from 'react';
import DashBoard from './pages/DashBoard';

class App extends Component {
  render() {
    return (
      <div className="App" >
        <DashBoard events={[]}/>
      </div>
    );
  }
}

export default App;
