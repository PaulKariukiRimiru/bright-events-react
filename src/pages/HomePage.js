// import React, { Component } from 'react';
// import { Row, Col } from 'react-flexbox-grid';
// import GridComponent from '../components/GridComponent';
// import { checkList } from '../Constants/common-functions';
// import { connect } from 'react-redux';
// import { eventPost, eventsGet, eventRsvp } from '../actions/accountActions';
// import { MuiThemeProvider } from 'material-ui/styles';
// import { displayMessageAction, dismissMessageAction } from '../actions/index';
// import SnackBarComponent from '../components/SnackBarComponent';
// import isObjectEmpty from 'is-empty-object';
// import Dialog from '../components/DialogComponent';
// import centerComponent from 'react-center-component';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import {} from 'material-ui/styles/colors';
// import { TOKEN } from '../Constants/action_type';

// const mapStateToProps = (state, ownProps) => ({
//  events: state.account.events, user: state.account.user, message: state.transaction.message.message, displayed: state.transaction.message.status, history: ownProps.history
// });

// export class HomePage extends Component {
//   state = {
//     loggedIn: false,
//     saveEmail: false,
//     email: '',
//     showDialog: false
//   }
//   handleRequestClose = () => {
//     this
//       .props
//       .dispatch(dismissMessageAction());
//   }

//   handleActionClick = () => {
//     this.handleRequestClose();
//     this
//       .props
//       .history
//       .push('/');
//   }

//   handleDialogClose = () => {
//     if (this.state.saveEmail) {
//       localStorage.setItem('email', this.state.email);
//     }
//     this
//       .props
//       .dispatch(eventRsvp(this.state.eventId, this.state.email));
//     this.setState({ showDialog: false });
//   }

//   onCheckChange = (checked) => {
//     this.setState({ saveEmail: checked });
//   }

//   onChange = (event) => {
//     const myStateCopy = this.state;
//     myStateCopy.email = event.target.value;
//     return this.setState(myStateCopy);
//   }

//   handleRsvpClick = (eventId) => {
//     this
//       .props
//       .dispatch(eventRsvp(eventId, this.props.user.email));
//   }

//   handleDisplayMessage = (message) => {
//     this
//       .props
//       .dispatch(displayMessageAction({ message }));
//   }

//   componentWillMount() {
//     if (!localStorage.getItem(TOKEN)) {
//       this
//         .props
//         .dispatch(displayMessageAction({ message: 'ensure you are logged in for smoother experience' }));
//     } else {
//       this.setState({ loggedIn: true });
//     }
//     this
//       .props
//       .dispatch(eventsGet());
//   }

//   renderEmpty() {
//     const myTheme = getMuiTheme({
//       palette: {
//         primary1Color: '#607D8B',
//         primary2Color: '#455A64',
//         accent1Color: '#FF5722',
//         textColor: '#212121',
//         alternateTextColor: '#757575'
//       }
//     });

//     return (
//       <MuiThemeProvider >
//         <div>
//           <Row center="xs">
//             <Col xs>
//               <h4>Hey there are no events at the momment</h4>
//             </Col>
//           </Row>
//           <SnackBarComponent
//             open={this.props.displayed}
//             handleRequestClose={this.handleRequestClose}
//             message={this.props.message}
//             action={this.state.loggedIn
//             ? ''
//             : 'Login'}
//             onActionClick={this.handleActionClick}/>
//           <Dialog
//             open={this.state.showDialog}
//             handleClose={this.handleDialogClose}
//             onChange={this.onChange}
//             checkChange={this.onCheckChange}
//             view={2}/>
//         </div>
//       </MuiThemeProvider>
//     );
//   }

//   renderEvents() {
//     return (
//       <MuiThemeProvider>
//         <div>
//           <Row center="xs">
//             <Col xs>
//               <GridComponent
//                 view={2}
//                 itemList={this.props.events}
//                 handleRsvpClick={this.handleRsvpClick}
//                 handleMessage={this.handleDisplayMessage}
//                 col={4}/>
//             </Col>
//           </Row>

//           <Dialog
//             open={this.state.showDialog}
//             handleClose={this.handleDialogClose}
//             onChange={this.onChange}
//             checkChange={this.onCheckChange}
//             view={2}/>

//           <SnackBarComponent
//             open={this.props.displayed}
//             handleRequestClose={this.handleRequestClose}
//             message={this.props.message}
//             action={this.state.loggedIn
//             ? ''
//             : 'Login'}
//             onActionClick={this.handleActionClick}/>

//         </div>
//       </MuiThemeProvider>
//     );
//   }

//   render() {
//     return checkList(this.props.events, this.renderEmpty.bind(this), this.renderEvents.bind(this));
//   }
// }

// export default connect(mapStateToProps)(HomePage);
