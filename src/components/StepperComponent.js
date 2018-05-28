import React, { Component } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  TextField
} from '@material-ui/core';

import { Row, Col } from 'react-flexbox-grid';
/**
 * Stepper presentational component
 * @export
 * @class StepperComponent
 * @extends Component
 */
export default class StepperComponent extends Component {
  state = {
    step: 0,
    end: false,
    form: {
      name: '',
      location: '',
      category: '',
      time: '',
      host: ''
    }
  };
  /**
   * handles submition of the form
   * @memberof StepperComponent
   * @returns {undefined}
   */
  handleSubmit = () => {
    this
      .props
      .handleSubmit(this.state.form);
  }
  /**
   * handles the population of the form
   * @memberof StepperComponent
   * @param {Object} event
   * @param {Date} date
   * @returns {undefined}
   */
  onChange = (event, date) => {
    const myStateCopy = this.state;
    if (event) {
      myStateCopy.form[event.target.name] = event.target.value;
    } else {
      myStateCopy.form.time = date
        .toISOString()
        .substring(0, 10);
    }
    return this.setState(myStateCopy);
  };
  /**
   * handles navigation to next step
   * @memberof StepperComponent
   * @returns {undefined}
   */
  handleStepNext = () => {
    let { step } = this.state;
    this.setState({
      step: step += 1,
      end: step >= this.props.steps
    });
  };
  /**
   * handles navigation to previous step
   * @memberof StepperComponent
   * @returns {undefined}
   */
  handleStepPrev = () => {
    const { step } = this.state;
    if (step > 0) {
      this.setState({
        step: step - 1
      });
    }
  };
  /**
   * handles the rendering of navigators for foward and backward navigation
   * @memberof StepperComponent
   * @param {Integer} thisStep
   * @returns {Node} div
   */
  renderNavigators(thisStep) {
    const { step } = this.state;

    return (
      <div>
        <Button primary='true' onClick={this.handleStepNext}>{step === this.props.steps
            ? 'Finish'
            : 'next'}</Button>
        {thisStep > 0 && <Button disabled={step === 0} onClick={this.handleStepPrev}>Back</Button>
        }
      </div>
    );
  }
  render() {
    const { step, end } = this.state;
    return (
      <div style={{
        maxWidth: 380,
        margin: 'auto'
      }}>
        <Stepper activeStep={step} orientation="vertical">
          {this
            .props
            .stepList
            .map((item, index) => (
              <Step key={index}>
                <StepLabel>{item.description}</StepLabel>
                <StepContent>
                  {item
                    .fields
                    .map((event, i) => (
                        <Row middle='xs' key={i}>
                          <Col xs={6}>
                            {event.name === 'time'
                              ?
                              <TextField
                                required
                                name={event.name}
                                refs={event.name}
                                label={this.state.form[event.name]
                                  ? this.state.form[event.name]
                                  : '' }
                                type='date'
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                onChange={this.onChange}
                              />
                              : <TextField
                                  required
                                  label={this.state.form[event.name]
                                  ? this.state.form[event.name]
                                  : event.name}
                                  refs={event.name}
                                  name={event.name}
                                  placeholder={this.state.form[event.name]
                                  ? this.state.form[event.name]
                                  : '' }
                                  onChange={this.onChange}/>
                            }
                          </Col>
                        </Row>
                      ))}
                  {this.renderNavigators(index)}
                </StepContent>
              </Step>
            ))}
        </Stepper>
        {end && (
          <Row middle='xs' style={{
            margin: 12
          }}>
            <Col xs={6}>
              <Button primary='true' onClick={this.handleSubmit}>Done</ Button>
            </Col>
          </Row>
        )}
      </div>
    );
  }
}
