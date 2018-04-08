import React, { Component } from 'react'
import { Row, Col } from 'react-flexbox-grid';
import GridComponent from '../components/GridComponent';
import { checkList } from '../Constants/common-functions';
import { connect } from 'react-redux';
import { eventPost, eventsGet, eventRsvp } from '../actions/accountActions';
import { MuiThemeProvider } from 'material-ui/styles';
import { displayMessageAction, dismissMessageAction } from '../actions/index';
import SnackBarComponent from '../components/SnackBarComponent';
import isObjectEmpty from 'is-empty-object';
import Dialog from '../components/DialogComponent';
import centerComponent from 'react-center-component';

const mapStateToProps = (state, ownProps) => ({
  events: state.account.events,
  user: state.account.user,
  message: state.transaction.message.message,
  displayed: state.transaction.message.status,
  history: ownProps.history
});

export class HomePage extends Component {

  state = {
    loggedIn: false,
    saveEmail: false,
    email: '',
    showDialog: false
  }
  handleRequestClose = () => {
    this.props.dispatch(dismissMessageAction())
  }

  handleActionClick = () => {
    this.handleRequestClose()
    this.props.history.push('/');
  }

  handleDialogClose = () => {
    if(this.state.saveEmail){
      localStorage.setItem('email', this.state.email)
    }
    this.props.dispatch(eventRsvp(this.state.eventId, this.state.email))
    this.setState({
      showDialog: false
    })
  }

  onCheckChange = (checked) => {
    this.setState({
      saveEmail: checked
    })
  }

  onChange = event => {
    let myStateCopy = this.state
    myStateCopy.email = event.target.value;
    return this.setState(myStateCopy);
  }

  handleRsvpClick = (eventId) => {
    if(this.state.loggedIn){
      this.props.dispatch(eventRsvp(eventId, this.props.user.email))
    }else if(localStorage.getItem('email')){
      this.props.dispatch(eventRsvp(eventId, localStorage.getItem('email')))
    }else{
      this.setState({
        showDialog: true,
        eventId: eventId
      })
    }
  }

  componentWillMount(){
    if(isObjectEmpty(this.props.user)){
      if(localStorage.getItem('email')){
        localStorage.removeItem('email')
      }
      this.props.dispatch(displayMessageAction({message:"ensure you are logged in for smoother experience"}))
    }else{
      localStorage.removeItem('email')
      this.setState({
        loggedIn: true
      })
    }
    this.props.dispatch(eventsGet())
  }

  renderEmpty () {
    return(
      <MuiThemeProvider>
        <div>
          <Row center="xs">
            <Col xs>
              <h4>Hey there are no events at the momment</h4>
            </Col>
          </Row>
          <SnackBarComponent 
            open = { this.props.displayed } 
            handleRequestClose = { this.handleRequestClose }
            message={ this.props.message } 
            action={this.state.loggedIn ? "" : "Login"}
            onActionClick={ this.handleActionClick }
            />
          <Dialog
            open = {this.state.showDialog}
            handleClose = {this.handleDialogClose}
            onChange = {this.onChange}
            checkChange = {this.onCheckChange}
            view = {2}
            />
        </div>
      </MuiThemeProvider>
    );
  };

  renderEvents () {
    return(
      <MuiThemeProvider>
        <div>
        <Row center="xs">
          <Col xs>
            <GridComponent view= {2} itemList={this.props.events} handleRsvpClick= { this.handleRsvpClick }/>
          </Col>
        </Row>
        
        <Dialog
              open = {this.state.showDialog}
              handleClose = {this.handleDialogClose}
              onChange = {this.onChange}
              checkChange = {this.onCheckChange}
              view = {2}/>

        <SnackBarComponent 
            open = { this.props.displayed } 
            handleRequestClose = { this.handleRequestClose }
            message={ this.props.message } 
            action={this.state.loggedIn ? "" : "Login"}
            onActionClick={ this.handleActionClick }
            />
        
        </div>
      </MuiThemeProvider>
    );
  };

  render() {
    return checkList(this.props.events, this.renderEmpty.bind(this), this.renderEvents.bind(this));
  };
};

export default connect(mapStateToProps)(HomePage);
