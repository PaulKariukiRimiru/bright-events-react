import React, { Component } from 'react'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

export default class ListItem extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Card >
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
