import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import StepperComponent from '../components/StepperComponent';

export default class DialogComponent extends Component {

  renderEventform(eventForm){
    return(
      <Dialog
          style={{maxWidth: 500, margin: 'auto'}}
          title="Add event"
          modal={false}
          open={this.props.open}
          onRequestClose={this.props.handleClose}>
          <StepperComponent stepList={eventForm} onChange={this.props.onChange} steps={eventForm.length} handleSubmit={this.props.handleSubmit}/>
      </Dialog>
    );
  };

  render() {
    
    switch (this.props.view) {
      case 1:
        return this.renderEventform(this.props.eventsFields);
      default:
        return;
    }
  }
}
