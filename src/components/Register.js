import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Row, Col } from 'react-flexgrid';
/**
 * Register form presentational component
 * @export
 * @class Register
 * @extends Component
 */
export default class Register extends Component {
  render() {
    const { onChange, handleRegister } = this.props;
    const divStyle = {
      margin: 12,
      marginTop: 18
    };

    return (
        <form onSubmit={handleRegister}>
            <Row center="xs">
                <Col xs={8}>
                    <div >
                        <Row middle="xs">
                            <Col xs={6}>
                                <TextField
                                    required
                                    id="username"
                                    label="username"
                                    type="name"
                                    name='username'
                                    autoComplete="current-email"
                                    margin="normal"
                                    style={divStyle}
                                    onChange={onChange}/>
                            </Col>
                        </Row>
                        <Row middle="xs">
                            <Col xs={6}>
                                <TextField
                                    required
                                    id="email"
                                    label="email"
                                    type="email"
                                    name='email'
                                    autoComplete="current-email"
                                    margin="normal"
                                    style={divStyle}
                                    onChange={onChange}/>
                            </Col>
                        </Row>
                        <Row middle="xs">
                            <Col xs={6}>
                                <TextField
                                    required
                                    id="password"
                                    label="password"
                                    type="password"
                                    name='password'
                                    margin="normal"
                                    style={divStyle}
                                    onChange={onChange}/>
                            </Col>
                        </Row>
                        <Row center="xs">
                            <Col xs={6}>
                                <Button
                                    name="submit"
                                    type="submit"
                                    variant="raised"
                                    color="secondary"
                                    style={{
                                    marginTop: 40
                                }}>Register</Button>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
            </form>
    );
  }
}
