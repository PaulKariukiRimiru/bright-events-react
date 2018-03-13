import React, { Component } from 'react';
import GridComponent from '../components/GridComponent';
import { Row, Col } from 'react-flexbox-grid';
import { FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { MuiThemeProvider } from 'material-ui/styles';
import { Grid } from 'react-flexgrid';


export default class DashBoard extends Component {

    renderGrid () {
        const fabstyling = {
            position: 'absolute',
            bottom:0,right:0,
            margin:32
        }
        return(
            <div>
                <MuiThemeProvider>
                    <Grid fluid>
                    <Row >
                        <Col xs>
                            <GridComponent itemList={this.props.events}/>
                            <Row bottom="xs">
                                <Col xsOffset={11} xs={1}>
                                    <FloatingActionButton secondary={true} style={fabstyling}>
                                        <ContentAdd />
                                    </FloatingActionButton>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    </Grid>
                </MuiThemeProvider>
            </div>
        )
    }

    renderEmpty () {
        const styling = { marginTop : '25%' }
        return(
                <MuiThemeProvider>
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
                                        <FloatingActionButton secondary={true}>
                                            <ContentAdd />
                                        </FloatingActionButton>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Grid>
                </MuiThemeProvider>
        )
    }

    render() {
        
            if (this.props.events.length) {
                return this.renderGrid()
            } else {
                return this.renderEmpty()
            }
    }
}
