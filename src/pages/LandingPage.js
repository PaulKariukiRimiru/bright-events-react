import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {Card, CardHeader, CardActions, CardMedia} from 'material-ui/Card'
import FontIcon from 'material-ui/FontIcon';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Login from '../components/Login';
import Register from '../components/Register';
export default class LandingPage extends Component {

    constructor(){
        super();
        this.state = {
            tabValue:0
        };
    }

    handleChange(value) {
        this.setState({
            tabValue : value
        });
    }

    render() {
        const accountsStyle = {
            marginTop : '15%',
            right:0,
        }

        return (
            <div >
            <MuiThemeProvider >
                <Grid fluid>
                    <Row middle="xs">
                        <Col xs={6}>
                            <Row middle="xs">
                                <Col xs={12}>
                                    <Row center="xs">
                                        <Col xs={12}>
                                            
                                            <p>Hey there, we are proud to intoduce the newest event creation and management system. We link the best event creators out there with clients.
                                                <br />But we dont stop there we make sure that our clients are always up to date with the latest, craziest turnups and events in their location. Advertising with us is the difference between TOTALLY SOLD OUT and Tickets still available</p>
                                        
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={6}>
                            <Row center="xs">
                                <Col xs>
                                <div>
                                    <Row middle="xs">
                                        <Col xsOffset={4} xs={8}>
                                        <Card style={accountsStyle}>
                                            <CardHeader
                                                title="Welcome to bright events"
                                                subtitle="Sign up or Create an account"
                                            />
                                            <CardMedia>
                                                
                                                    <Tabs
                                                        value={this.state.tabValue}
                                                        onChange={this.handleChange.bind(this)}>
                                                        <Tab
                                                            icon={<FontIcon className="material-icons">person</FontIcon>}
                                                            label="Login"
                                                            value={0}
                                                            />
                                                        <Tab
                                                            icon={<FontIcon className="material-icons">person_add</FontIcon>}
                                                            label="Register"
                                                            value={1}
                                                            />
                                                    </Tabs>
                                                    <SwipeableViews
                                                        index={this.state.tabValue}
                                                        onChange={this.handleChange.bind(this)}>
                                                        <Grid fluid>
                                                            <Row>
                                                                <Col>
                                                                    <Login /> 
                                                                </Col>
                                                            </Row>
                                                        </Grid>
                                                        <Grid fluid>
                                                            <Row>
                                                                <Col>
                                                                    <Register /> 
                                                                </Col>
                                                            </Row>
                                                        </Grid>
                                                    </SwipeableViews>
                                            </CardMedia>
                                            <CardActions>

                                            </CardActions>
                                        </Card>
                                        </Col>
                                    </Row>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                </Grid>
            </MuiThemeProvider>
            </div>
        )
    }
}
