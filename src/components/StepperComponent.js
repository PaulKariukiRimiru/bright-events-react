import React, { Component } from 'react';
import Stepper, { Step, StepLabel, StepContent } from 'material-ui/Stepper';

import Button from 'material-ui/Button';
import { Row, Col } from 'react-flexbox-grid';
import TextField from 'material-ui/TextField';

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

  handleSubmit = () => {
    this
      .props
      .handleSubmit(this.state.form);
  }

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

  handleStepNext = () => {
    let { step, end } = this.state;
    this.setState({
      step: step += 1,
      end: step >= this.props.steps
    });
  };

  handleStepPrev = () => {
    const { step } = this.state;
    if (step > 0) {
      this.setState({
        step: step - 1
      });
    }
  };

  renderNavigators(thisStep) {
    const { step, end } = this.state;

    return (
      <div>
        <Button primary='true' onClick={this.handleStepNext}>{step === this.props.steps
            ? 'Finish'
            : 'next'}</Button>
        {thisStep > 0 && <Button label="back" disabled={step === 0} onClick={this.handleStepPrev}></Button>
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
                    .map((item, index) => (
                        <Row middle="xs" key={index}>
                          <Col xs={6}>
                            {item.name === 'time'
                              ?
                              <TextField
                                name={item.name}
                                refs={item.name}
                                label={this.state.form[item.name]
                                  ? this.state.form[item.name]
                                  : '' }
                                type='date'
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                onChange={this.onChange}
                              />
                              : <TextField
                                  label={this.state.form[item.name]
                                  ? this.state.form[item.name]
                                  : item.name}
                                  refs={item.name}
                                  name={item.name}
                                  placeholder={this.state.form[item.name]
                                  ? this.state.form[item.name]
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
