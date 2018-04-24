import React, { Component } from 'react'
import {Row, Col} from 'react-flexgrid';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


export default class Login extends Component {
    
    render() {

        const divStyle = {
            margin : 12,
            marginTop : 50
        }

        return (
                <Row center="xs">
                    <Col xs={10}>
                        <Row >
                            <Col >
                                <TextField 
                                    floatingLabelText="Email"
                                    refs="emailField"
                                    name="email"
                                    style={divStyle}
                                    onChange={this.props.onChange}
                                    type='email'
                                    autoComplete='email'
                                    />
                            </Col>
                        </Row>
                        <Row>
                            <Col >
                                <TextField
                                    floatingLabelText="Password"
                                    refs="passwordField"
                                    name="password"
                                    style={divStyle}
                                    onChange={this.props.onChange}
                                    type='password'/>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <span style={{marginLeft: 20}}>forgot your password?</span>
                            </Col>
                        </Row>

                        <Row center="xs">
                            <Col xs={4}>
                                <RaisedButton 
                                    name="submit" 
                                    type="submit"
                                    onClick={this.props.handleFormSubmition} 
                                    primary={true} 
                                    label="Login"
                                    style={{marginTop:40}}
                                    />
                            </Col>
                        </Row>

                    </Col>
                </Row>
        )
    }
}
