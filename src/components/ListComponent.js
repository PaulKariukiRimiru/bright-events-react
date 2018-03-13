import React, { Component } from 'react';
import List from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ListItem from './ListItem';
export default class ListComponent extends Component {
    
    render() {
        return (
            <MuiThemeProvider>
                
                <div >
                    <List >

                        {this.props.itemList.map((item, index) => {
                            return(<ListItem key={index}>item</ListItem>);
                        })}

                    </List>
                    
                </div>
            </MuiThemeProvider>
        )
    }
}
