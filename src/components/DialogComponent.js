// import React, {Component} from 'react';
// import Dialog from 'material-ui/Dialog';
// import StepperComponent from '../components/StepperComponent';
// import {TextField, Checkbox, AutoComplete, RaisedButton} from 'material-ui';
// import {Row, Col} from 'react-flexgrid';
// import FlatButton from 'material-ui/FlatButton/FlatButton';
// import Center from 'react-center';
// import ListComponent from '../components/ListComponent';
// export default class DialogComponent extends Component {

//   state = {
//     checked: false
//   }

//   onCheck = () => {
//     this.setState({
//       checked: !this.state.checked
//     })
//     this
//       .props
//       .checkChange(!this.state.checked)
//   }

//   renderFilter = () => {
//     const locations = [];
//     const category = [];
//     const names = [];

//     const { events, handleChange } = this.props;

//     if (events) {
//       events.forEach(event => {
//         names.push(event.name)
//         locations.push(event.location)
//         category.push(event.category)
//       });
//     }

//     return (
//       <Dialog
//         style={{
//         maxWidth: 500,
//         margin: 'auto'
//       }}
//         title="Filter events"
//         modal={false}
//         open={this.props.open}>
//         <Row center="xs">
//           <Col xs={12}>
//           <AutoComplete
//               floatingLabelText="Name"
//               name="q"
//               dataSource={names}
//               filter={AutoComplete.noFilter}
//               openOnFocus={true}/>
//             <AutoComplete
//               floatingLabelText="Location"
//               name="location"
//               dataSource={locations}
//               filter={AutoComplete.noFilter}
//               openOnFocus={true}/>
//             <AutoComplete
//               floatingLabelText="Category"
//               name="category"
//               dataSource={category}
//               filter={AutoComplete.noFilter}
//               onUpdateInput={handleChange}
//               onNewRequest={handleChange}
//               openOnFocus={true}/>
//             <RaisedButton
//               label="Search"
//               onClick={this.props.handleClose}
//               style={{
//               margin: 12
//             }}/>
//           </Col>
//         </Row>
//       </Dialog>
//     );
//   }

//   renderEventform(eventForm) {
//     return (
//       <Center>
//         <Dialog
//           style={{
//           maxWidth: 500,
//           margin: 'auto'
//         }}
//           title="Add event"
//           modal={false}
//           open={this.props.open}
//           onRequestClose={this.props.handleClose}>
//           <StepperComponent
//             stepList={eventForm}
//             onChange={this.props.onChange}
//             steps={eventForm.length}
//             handleSubmit={this.props.handleSubmit}/>
//         </Dialog>
//       </Center>
//     );
//   };

//   renderRsvpList() {
//     return (
//       <Dialog
//         style={{
//         maxWidth: 500,
//         margin: 'auto'
//       }}
//         modal={false}
//         open={this.props.open}
//         onRequestClose={this.props.handleClose}>
//         <ListComponent
//           rsvpList={this.props.rsvpList}
//           onToggleRsvpStatus={this.props.onToggleRsvpStatus}/>
//       </Dialog>
//     );
//   };

//   renderEmailRequest() {

//     const actions = [< FlatButton label = "submit" onClick = {
//         this.props.handleClose
//       }
//       primary = {
//         true
//       } />]
//     return (
//       <Dialog
//         style={{
//         maxWidth: 700
//       }}
//         title="RSVP Request"
//         modal={false}
//         open={this.props.open}
//         onRequestClose={this.props.handleClose}
//         actions={actions}>
//         <Row center="xs">
//           <Col xs={12}>
//             <TextField
//               floatingLabelText="Enter an email address to reserve this email"
//               refs="emailField"
//               name="email"
//               onChange={this.props.onChange}
//               style={{
//               width: '100%',
//               margin: '12'
//             }}/>
//           </Col>
//           <Col xs={8}>
//             <Checkbox
//               label="use this email throughout"
//               checked={this.state.checked}
//               onCheck={this.onCheck}/>
//           </Col>
//         </Row>
//       </Dialog>
//     );
//   }

//   render() {
//     switch (this.props.view) {
//       case 1:
//         return this.renderEventform(this.props.eventsFields);
//       case 2:
//         return this.renderEmailRequest();
//       case 3:
//         return this.renderRsvpList();
//       case 4:
//         return this.renderFilter();
//       default:
//         return;

//     }
//   }
// }
