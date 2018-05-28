import React, { Component } from 'react';
import { Row, Col } from 'react-flexgrid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
/**
 * Login form presentational component
 * @export
 * @class Login
 * @extends Component
 */
export default class Login extends Component {
  render() {
    const { onChange, handleLogin } = this.props;
    const divStyle = {
      margin: 12,
      marginTop: 24
    };

    return (
      <Row center="xs">
        <Col xs={12}>
          <div>
            <Row middle="xs">
              <Col xs={10}>
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
              <Col xs={10}>
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
            <Row center='xs'>
              <Col xs={8}>
                <Button
                  name="submit"
                  type="submit"
                  variant="raised"
                  color="secondary"
                  onClick={handleLogin}
                  style={{
                  marginTop: 40
                }}>Login</Button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    );
  }
}
