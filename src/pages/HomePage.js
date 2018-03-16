import React, { Component } from 'react'
import { Row, Col } from 'react-flexbox-grid';
import GridComponent from '../components/GridComponent';
import { checkList } from '../Constants/common-functions';
export default class HomePage extends Component {

    renderEmpty () {
        return(
            <Row center="xs">
                <Col xs>
                    <h4>Hey there are no events at the momment</h4>
                </Col>
            </Row>
        )
    }

    renderEvents () {
        return(
            <Row center="xs">
                <Col xs>
                    <GridComponent itemList={this.props.events} />
                </Col>
            </Row>
        )
    }

    render() {

        return checkList(this.props.events, this.renderEmpty.bind(this), this.renderEvents.bind(this))
        
    }
}
