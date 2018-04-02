import React, { Component } from 'react'
import {Row, Col} from 'react-flexgrid';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class Login extends Component {
    
    render() {

        const mainStyle = {
            width : '75%'
        }

        const divStyle = {
            margin : 12,
            marginTop : 50
        }


        return (
                <Row center="xs" style={mainStyle}>
                    <Col xs={6}>
                        <form onSubmit={this.props.handleFormSubmition}>
                            <Row middle="xs">
                                <Col xs={6}>
                                    <TextField 
                                        floatingLabelText="Email"
                                        refs="emailField"
                                        name="email"
                                        style={divStyle}
                                        onChange={this.props.onChange}/>
                                </Col>
                            </Row>
                            <Row middle="xs">
                                <Col xs={6}>
                                    <TextField
                                        floatingLabelText="Password"
                                        refs="passwordField"
                                        name="password"
                                        style={divStyle}
                                        onChange={this.props.onChange}/>
                                </Col>
                            </Row>
                            <Row center="xs">
                                <Col xs={4}>
                                    <RaisedButton 
                                        name="submit" 
                                        type="submit"
                                        onClick={this.clickHandler} 
                                        primary={true} 
                                        label="Login"
                                        style={divStyle}
                                        />
                                </Col>
                            </Row>
                        </form>
                    </Col>
                </Row>
        )
    }
}
