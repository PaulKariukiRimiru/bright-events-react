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
import { eventPost, eventsGet } from '../actions/accountActions';
import { TOKEN } from '../Constants/action_type';
import isObjectEmpty from 'is-empty-object';

function mapStateToProps (state, ownProps){
  
    return({
      user: state.account.user,
      events: state.account.events,
      fetching: state.transaction.fetching,
    })
}
export class DashBoard extends Component {

  componentWillMount(){
    console.log(this.props);
    
    this.props.dispatch(eventsGet())
  }

  constructor(){
      super();
      this.state = {
        showDialog: false,
        form: { name:'',
                location:'',
                category:'',
                time:'',
                host:'' 
              }
      };
      this.onChange = this.onChange.bind(this);
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
            <DialogComponent handleSubmit={this.onFinish} eventsFields={fields} onChange={this.onChange} handleClose={this.handleClose} open={this.state.showDialog} view={1}/>
            <Grid fluid>
              <Row center="xs">
                <Col xs={12}>
                  <GridComponent 
                    itemList={this.props.events} 
                    itemClickAction= {this.props.actions}
                    view= {1}/>
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
            <DialogComponent view={1} eventsFields={fields} onChange={this.onChange} handleClose={this.handleClose} open={this.state.showDialog} handleSubmit={this.onFinish}/>
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
        showDialog:true
      })
    }

    handleClose(){
      this.setState({
        showDialog:false
      })
    }

    onChange(event, date){
      let myStateCopy = this.state
      if(event){
        myStateCopy.form[event.target.name] = event.target.value;
      }else{
        myStateCopy.form.time = date.toISOString().substring(0, 10)
      }
     
      return this.setState(myStateCopy);
    };

    onFinish(){
      this.setState({
        showDialog:false
      })      
      const eventDetails = this.state.form
      eventDetails.host = this.props.user.id
      eventDetails.token = localStorage.getItem(TOKEN)   
      this.props.dispatch(eventPost(eventDetails))
    }

    render() {
      return checkList(this.props.events, this.renderEmpty.bind(this), this.renderGrid.bind(this));
    };
};

export default connect(mapStateToProps)(DashBoard)
