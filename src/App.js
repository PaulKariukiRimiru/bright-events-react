import React, { Component } from 'react';
import { connect } from 'react-redux';

/**
 * App container component
 * @class App
 * @extends Component
 */
class App extends Component {
  render() {
    return (
      <div className="App" style={{ overflowX: 'hidden', margin: 0, padding: 0 }}>
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return ({
    user: state.account.user,
  });
}

export default connect(mapStateToProps)(App);
