import React, { Component } from 'react';
import GridComponent from '../components/GridComponent';
import { Row, Col } from 'react-flexbox-grid';
import { FloatingActionButton, Dialog } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { MuiThemeProvider } from 'material-ui/styles';
import { Grid } from 'react-flexgrid';
import { checkList } from '../Constants/common-functions';
import { connect } from 'react-redux';
import DialogComponent from '../components/DialogComponent';
import { eventPost, eventsGet, eventEdit, eventDelete, eventRsvpGet, eventManageRsvp } from '../actions/accountActions';
import isObjectEmpty from 'is-empty-object';
import SnackBarComponent from '../components/SnackBarComponent';
import { dismissMessageAction } from '../actions/index';
import jwt_decode from 'jwt-decode';
import { TOKEN } from '../Constants/action_type';

function mapStateToProps (state, ownProps){
    return({
      user: state.account.user,
      events: state.account.events,
      rsvps: state.account.rsvps,
      fetching: state.transaction.fetching,
      message: state.transaction.message.message,
      displayed: state.transaction.message.status,
      history: ownProps.history
    })
}
export class DashBoard extends Component {

  componentWillMount(){    
    this.props.dispatch(eventsGet())
  }

  handleRequestClose = () => {
    this.props.dispatch(dismissMessageAction())
    
  }
  
  constructor(){
      super();
      this.state = {
        showDialog: false,
        editForm: {},
        view: 1
      };
      this.onFinish = this.onFinish.bind(this);
      this.handleFabClick = this.handleFabClick.bind(this);
      this.handleClose = this.handleClose.bind(this);
  };

    renderGrid () {

      const fabstyling = {
          position: 'relative',
          bottom:0,right:0,
          margin:32
      };

      const fields = [
        {description:"Give the event a name", fields:[{name:"name"}]},
        {description:"Where will it be?", fields:[{name:"location"}]},
        {description:"what category is the event", fields:[{name:"category"}]},
        {description:"When will this be?", fields:[{name:"time"}]},
      ]

      return(
        <div>
          <MuiThemeProvider>
            <DialogComponent onToggleRsvpStatus = {this.onToggleRsvpStatus} rsvpList = {this.props.rsvps} handleSubmit={this.onFinish} eventsFields={fields} onChange={this.onChange} handleClose={this.handleClose} open={this.state.showDialog} view={this.state.view}/>
            <Grid fluid>
              <Row center="xs">
                <Col xs={12}>
                  <GridComponent 
                    itemList={this.props.events} 
                    itemClickAction= {this.props.actions}
                    view= {1}
                    onEditChange = {this.onEditChange}
                    onEditSubmit = {this.onEditSubmit}
                    onDeleteSubmit = {this.onDeleteSubmit}
                    onRsvpRequest = {this.onRsvpRequest}/>
                  <Row bottom="xs">
                    <Col xsOffset={11} xs={1}>
                      <FloatingActionButton secondary={true} style={fabstyling} onClick={this.handleFabClick}>
                        <ContentAdd />
                      </FloatingActionButton>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Grid>
            <SnackBarComponent 
            open = { this.props.displayed } 
            handleRequestClose = { this.handleRequestClose }
            message={ this.props.message } 
            />
          </MuiThemeProvider>
        </div>
      );
    };

    renderEmpty () {
        const styling = { marginTop : '25%' };
        const fields = [
          {description:"Give the event a name", fields:[{name:"name"}]},
          {description:"Where will it be?", fields:[{name:"location"}]},
          {description:"what category is the event", fields:[{name:"category"}]},
          {description:"When will this be?", fields:[{name:"time"}]},
        ]
        return(
          <MuiThemeProvider>
            <DialogComponent view={this.state.view} rsvpList = {this.props.rsvps} eventsFields={fields} onChange={this.onChange} handleClose={this.handleClose} open={this.state.showDialog} handleSubmit={this.onFinish}/>
            <Grid fluid> 
              <Row center="xs" style={styling}>
                <Col xs={10}>
                  <Row center="xs">
                    <Col xs={10}>
                      <h4>Sorry, you do not have any events, create some</h4>
                    </Col>
                  </Row>
                  <Row center="xs">
                    <Col xs={1}>
                      <FloatingActionButton secondary={true} onClick={this.handleFabClick}>
                        <ContentAdd />
                      </FloatingActionButton>
                    </Col>
                  </Row>
                </Col>
                </Row>
            </Grid>
          </MuiThemeProvider>
        );
    };

    handleFabClick(){
      this.setState({
        showDialog:true,
        view: 1
      })
    }

    handleClose(){
      this.setState({
        showDialog:false
      })
    }

    onDeleteSubmit = (eventId) => {
      console.log("event id", eventId);
      this.props.dispatch(eventDelete(eventId))
    }

    onEditChange = (event, date) => {
      let myStateCopy = this.state
      if(event){
        myStateCopy.editForm[event.target.name] = event.target.value;
      }else{
        myStateCopy.editForm.time = date.toISOString().substring(0, 10)
      }
     
      return this.setState(myStateCopy);
    }

    onEditSubmit = (id) => {
      if (!isObjectEmpty(this.state.editForm)){
        this.props.dispatch(eventEdit(id, this.state.editForm))
        this.setState({
          editForm: {}
        })
      }
    }

    onRsvpRequest = (id) => {
      this.props.dispatch(eventRsvpGet(id))
      this.setState({
        showDialog: true,
        view: 3
      })
    }

    onToggleRsvpStatus = (id, status, email) => {
      const details = {
        accept_status: status,
        client_email: email
      }
      this.props.dispatch(eventManageRsvp(id, details))
    }

    onFinish = (eventDetails) =>{
      this.setState({
        showDialog:false
      })

      eventDetails.host = this.props.user.id ? this.props.user.id : jwt_decode(localStorage.getItem(TOKEN)).identity.id;
      eventDetails.token = localStorage.getItem(TOKEN)  
      this.props.dispatch(eventPost(eventDetails))
    }

    render() {
      return checkList(this.props.events, this.renderEmpty.bind(this), this.renderGrid.bind(this));
    };
};

export default connect(mapStateToProps)(DashBoard)
