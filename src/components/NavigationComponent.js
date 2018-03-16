import React, { Component } from 'react'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Link } from 'react-router-dom';

export default class NavigationComponent extends Component {
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <Drawer open={ this.props.open }>
                        <Link to="/"><MenuItem primaryText="Back" onClick={ this.props.handletoggle }></MenuItem></Link>
                        <Link to="/home"><MenuItem primaryText="Home" onClick={ this.props.handletoggle }></MenuItem></Link>
                        <Link to="/dashboard" ><MenuItem primaryText="Dashboard" onClick={ this.props.handletoggle }></MenuItem></Link>
                    </Drawer>
                </MuiThemeProvider>
            </div>
        )
    }
}