import React, { Component } from 'react'
import { Row, Col } from 'react-flexbox-grid';
import GridComponent from '../components/GridComponent';
import { checkList } from '../Constants/common-functions';
import { connect } from 'react-redux';
import { eventPost, eventsGet } from '../actions/accountActions';
import { MuiThemeProvider } from 'material-ui/styles';

const mapStateToProps = (state, ownProps) => ({
  events: state.account.events
});

export class HomePage extends Component {


  componentWillMount(){
    this.props.dispatch(eventsGet())
  }

  renderEmpty () {
    return(
      <Row center="xs">
        <Col xs>
          <h4>Hey there are no events at the momment</h4>
        </Col>
      </Row>
    );
  };

  renderEvents () {
    return(
      <MuiThemeProvider>
      <Row center="xs">
        <Col xs>
          <GridComponent view= {2} itemList={this.props.events} />
        </Col>
      </Row>
      </MuiThemeProvider>
    );
  };

  render() {
    return checkList(this.props.events, this.renderEmpty.bind(this), this.renderEvents.bind(this));
  };
};

export default connect(mapStateToProps)(HomePage);
