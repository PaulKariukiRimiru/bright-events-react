import React, { Component } from 'react';
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import DialogComponent from '../components/DialogComponent';
import RaisedButton from 'material-ui/RaisedButton';
import { Row, Col } from 'react-flexbox-grid';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';

export default class StepperComponent extends Component {


  state = {
    step: 0,
    end: false,
    form: { name:'',
            location:'',
            category:'',
            time:'',
            host:'' 
          }
  };

  handleSubmit = () => {
    this.props.handleSubmit(this.state.form);
  }

  onChange = (event, date) => {
    let myStateCopy = this.state
    if(event){
      myStateCopy.form[event.target.name] = event.target.value;
    }else{
      myStateCopy.form.time = date.toISOString().substring(0, 10)
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

  handleStepPrev = () =>{
    let { step } = this.state;
    if (step > 0) {
      this.setState({
        step: step-1
      });
    };
  };

  renderNavigators(thisStep){
    const { step, end } = this.state

    return(
      <div>
        <RaisedButton
          label={step === this.props.steps ? "Finish": "next"}
          primary={true}
          onClick={this.handleStepNext}
        />
        {thisStep > 0 &&
          <RaisedButton
              label="back"
              disabled={step === 0}
              onClick={this.handleStepPrev}
            />
        }
      </div>
    );
  };

  render() {

    const { step, end } = this.state

    return (
      <div style={{maxWidth: 380, margin: 'auto'}}>
        <Stepper activeStep={step} orientation="vertical">
          {this.props.stepList.map((item, index) => {

            return (
                <Step>
                  <StepLabel>{item.description}</StepLabel>
                  <StepContent>
                    {item.fields.map((item, index) => {
                      return(
                      <Row middle="xs">
                        <Col xs={6}>
                        {item.name === 'time' ? 
                          <DatePicker name={item.name} ref={item.name} hintText={this.state.form[item.name] ? this.state.form[item.name] : ""} onChange={this.onChange}/> :
                          <TextField 
                                floatingLabelText={ this.state.form[item.name] ? this.state.form[item.name] : item.name}
                                refs={item.name}
                                name={item.name}
                                hintText={this.state.form[item.name] ? this.state.form[item.name] : ""}
                                onChange={this.onChange}/>
                        }
                            
                          </Col>
                      </Row>
                      )
                    })}
                    {this.renderNavigators(index)}
                  </StepContent>
                </Step> 
          )})}
        </Stepper>
        {end && (
          <Row middle="xs" style={{margin:12}}>
          <Col xs={6}>
            <RaisedButton
                label="Done"
                primary={true}
                onClick={this.handleSubmit}
              />
            </Col>
        </Row>
        )}
      </div>
    );
  };
};
