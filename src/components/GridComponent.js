import React, { Component } from 'react'
import GridList from 'material-ui/GridList'
import GridTile from 'material-ui/GridList/GridTile'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

export default class GridComponent extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <GridList>
                        {this.props.itemList.map(() => {
                            return (<GridTile />)
                        })}
                    </GridList>
                </div>
            </MuiThemeProvider>
        )
    }
}
