import React, { Component } from 'react'

export default class FormComponent extends Component {
  render() {
    return (
      <MuiThemeProvider style={mainStyle}>
          <Row center="xs">
              <Col xs="6">
                  <form onSubmit={this.props.handleFormSubmition}>
                    {this.props.fields.map((item, index) => {
                      <Row middle="xs">
                        <Col xs="6">
                            <TextField 
                                floatingLabelText={item.name}
                                refs={item.name}
                                name={item.name}
                                style={divStyle}
                                onChange={this.props.onChange}/>
                        </Col>
                    </Row>
                    })}
                      <Row center="xs">
                          <Col xs="4">
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
      </MuiThemeProvider>
    )
  }
}
