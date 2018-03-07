import React, { Component } from 'react';
import List from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

export default class ListComponent extends Component {
    
    render() {
        return (
            <MuiThemeProvider>
                
                <div>
                    <List >

                        {this.props.itemList.map((item, index) => {
                            return(<li>item</li>);
                        })}

                    </List>
                    
                </div>
            </MuiThemeProvider>
        )
    }
}
