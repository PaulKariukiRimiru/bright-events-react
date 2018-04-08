import React, { Component } from 'react'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {white, blue400} from 'material-ui/styles/colors';
import { Subheader, FlatButton, Toggle } from 'material-ui';
import { ListItem }from 'material-ui/List';

export default class ListItemComponent extends Component {

    state = {
        status: true
    }

    componentWillMount(){
        this.setState({
            status: this.props.rsvp.accepted
        })
    }

    handleToggle = () => {
        this.setState({
            status: !this.state.status
        })
        this.props.onToggleRsvpStatus(this.props.rsvp.event_id, !this.state.status, this.props.rsvp.email)
    }

    render() {
        console.log("list props", this.props);
        
        return (
            <ListItem 
                primaryText={this.props.rsvp.email}
                secondaryText={this.state.status ? "Accepted" : "Rejected"}
                leftAvatar={
                    <Avatar
                        color={white} 
                        backgroundColor={blue400}
                        style={{left: 8}}>
                        {this.props.rsvp.email.substring(0,1).toUpperCase()}
                    </Avatar>
                }
                rightToggle={
                <Toggle 
                    defaultToggled={this.state.status} 
                    onToggle={this.handleToggle} />}					
                />
        )
    }
}
