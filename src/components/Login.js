import React, { Component } from 'react'
import {Row, Col} from 'react-flexgrid';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class Login extends Component {
    render() {
        var divStyle = {
            margin: 12,
        }  
        
        return (
            <MuiThemeProvider>
            <div>
                <Row>
                    <Col>
                        <form>
                        <Row>
                            <Col>
                                <TextField style={divStyle}
                                    floatingLabelText="Email"
                                    refs="emailField"
                                    name="email"/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <TextField style={divStyle}
                                    floatingLabelText="Password"
                                    refs="passwordField"
                                    name="password"/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <RaisedButton name="submit" onClick={this.clickHandler} primary={true} style={divStyle} label="Register"/>
                            </Col>
                        </Row>
                        </form>
                    </Col>
                </Row>
            </div>
            </MuiThemeProvider>
        )
    }
}
