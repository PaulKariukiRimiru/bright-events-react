import React, { Component } from 'react'
import GridList from 'material-ui/GridList'
import GridItemComponent from './GridItemComponent';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

export default class GridComponent extends Component {
    render() {
        console.log("grid props comp", this.props);
        return (
            <div>
                <GridList cols={4} padding = {2} cellHeight={'auto'} >
                    {this.props.itemList.map((item, i) => {
                        return (<GridItemComponent 
                                        key={i} event={item} 
                                        view={this.props.view} 
                                        handleRsvpClick={this.props.handleRsvpClick}/>)
                    })}
                </GridList>
            </div>
        )
    }
}
