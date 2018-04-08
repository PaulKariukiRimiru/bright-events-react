import React, { Component } from 'react'
import GridList from 'material-ui/GridList'
import GridItemComponent from './GridItemComponent';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

export default class GridComponent extends Component {
    render() {
        
        return (
            <div>
                <GridList cols={4} padding = {2} cellHeight={'auto'} cellWidth={'auto'} >
                    {this.props.itemList.map((item, i) => {
                        return (<GridItemComponent 
                                        key={i} 
                                        event={item} 
                                        view={this.props.view} 
                                        handleRsvpClick={this.props.handleRsvpClick}
                                        onEditChange = {this.props.onEditChange}
                                        onEditSubmit = {this.props.onEditSubmit}
                                        onDeleteSubmit = {this.props.onDeleteSubmit}
                                        onRsvpRequest = {this.props.onRsvpRequest}/>)
                    })}
                </GridList>
            </div>
        )
    }
}
