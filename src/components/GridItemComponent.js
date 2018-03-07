import React, { Component } from 'react'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import { CardTitle } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

export default class GridItemComponent extends Component {
    render() {
        return (
            <MuiThemeProvider>
            <div>
                <Card>
                    <CardHeader />
                    <CardText>
                    
                    </CardText>
                    <CardActions>
                    </CardActions>
                </Card>
            </div>
            </MuiThemeProvider>
        )
    }
}
