import React, { Component } from 'react'
import Drawer from 'material-ui/Drawer';
import MenuItem  from 'material-ui/MenuItem';
import  MuiThemeProvider  from 'material-ui/styles/MuiThemeProvider';

export default class NavigationComponent extends Component {
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <Drawer>
                        <MenuItem ></MenuItem>
                    </Drawer>
                </MuiThemeProvider>
            </div>
        )
    }
}
