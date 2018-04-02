import React, { Component } from 'react'
import { Card, CardActions, CardHeader, CardMedia, CardTitle } from 'material-ui/Card'
import GridTile  from 'material-ui/GridList/GridTile';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { FloatingActionButton, Dialog } from 'material-ui';
import Favorite from 'material-ui/svg-icons/action/favorite'
import FavBorder from 'material-ui/svg-icons/action/favorite-border';
import Delete from 'material-ui/svg-icons/action/delete';
import Edit from 'material-ui/svg-icons/editor/mode-edit';
import Rsvp from 'material-ui/svg-icons/action/stars';
import { Row } from 'react-flexgrid';
import Col from 'react-flexgrid/lib/Col';


export default class GridItemComponent extends Component {

    state = {
        selected : false
    }

    handleFabClick = () => {
        const { selected } = this.state
        this.setState({
            selected : !selected
        })
    }

    renderDashboard(){
        const event = this.props.event
        const style = {
            margin: 2,
          };
        return (
            <Row center="xs">
                <Col xs={10}>
                <Card style={{maxHeight:300, maxWidth:280, margin:4}}>
                <CardHeader title={<h2>{event.name}</h2>} subtitle={event.location}/>
                    <CardMedia >
                        {event.time? 
                            <h4>{event.time}</h4>:
                            <h4>{event.date.substring(0,10)}</h4>
                        }
                    </CardMedia >
                    <CardActions>
                        <Row center="xs">
                            <Col xs={12}>

                                <FloatingActionButton style={{margin:2}}  onClick={this.handleFabClick}>
                                    <Rsvp />
                                </FloatingActionButton>
                                <FloatingActionButton style={{margin:2}}  onClick={this.handleFabClick}>
                                    <Edit />
                                </FloatingActionButton>
                                <FloatingActionButton style={{margin:2}}  onClick={this.handleFabClick} secondary={true}>
                                    <Delete />
                                </FloatingActionButton>
                            </Col>
                        </Row>
                    </CardActions>
                </Card>
                </Col>
            </Row>
        )
    }

    renderHome(){
        const event = this.props.event
        return(
            <Row center="xs">
                <Col xs={10}>
                <Card style={{maxHeight:300, maxWidth:280, margin:12}}>
                    <CardHeader title={event.name}/>
                    <CardMedia >
                        {event.time? 
                            <h4>{event.time}</h4>:
                            <h4>{event.date.substring(0,10)}</h4>
                        }
                        <h5>{event.location}</h5>
                    </CardMedia >
                    <CardActions>
                        <Row center="xs">
                            <Col xs={12}>
                                <FloatingActionButton style={{margin:4}}  onClick={this.handleFabClick}>
                                    {this.state.selected ? <Favorite /> : <FavBorder /> }
                                </FloatingActionButton>
                            </Col>
                        </Row>
                    </CardActions>
                </Card>
                </Col>
            </Row>
        )
    }

    render() {
        switch (this.props.view) {
            case 1:
                return this.renderDashboard();
            case 2:
                return this.renderHome()        
            default:
                break;
        }
        
    }
}
