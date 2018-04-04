import React, { Component } from 'react'
import { Card, CardActions, CardHeader, CardMedia, CardTitle , CardText} from 'material-ui/Card'
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
import FlatButton from 'material-ui/FlatButton';

export default class GridItemComponent extends Component {

    state = {
        selected : false
    }

    handleFabClick = () => {
        
    }

    handleClick = () => {
        const { selected } = this.state
        this.setState({
            selected : !selected
        })
        this.props.handleRsvpClick(this.props.event.id)
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
                    <CardMedia>
                        <div style={{ height:150, backgroundColor: '#2196F3'}} >
                            <CardTitle titleColor='white' subtitleColor='#FAFAFA' 
                                    style={{textAlign: 'left', position:'absolute', bottom:'0px'}} 
                                    title={event.name} subtitle={event.location} />
                        </div>
                    </CardMedia>
                    <CardText >
                    {event.time? 
                        <h4>{new Date(event.time).toDateString()}</h4>:
                        <h4>{new Date(event.date).toDateString()}</h4>
                    }
                    </CardText>
                    <CardActions>
                        <Row center="xs" style={{padding:2}}>
                            <Col xs={4}>
                                <FlatButton onClick={this.handleFabClick} 
                                            icon={<Rsvp color="#FFF59"/>}
                                            />
                            </Col>
                            <Col xs={4}>
                                <FlatButton onClick={this.handleFabClick} 
                                            icon={<Edit color="#CE93D8"/>} 
                                            />
                            </Col>
                            <Col xs={4}>
                                <FlatButton onClick={this.handleFabClick} 
                                            icon={<Delete color="#FFAB91" />} 
                                            />
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

                <Card style={{maxHeight:300, maxWidth:280, margin:4}}>
                    <CardMedia>
                        <div style={{ height:150, backgroundColor: '#2196F3'}} >
                            <CardTitle titleColor='white' subtitleColor='#FAFAFA' 
                                    style={{textAlign: 'left', position:'absolute', bottom:'0px'}} 
                                    title={event.name} subtitle={event.location} />
                        </div>
                    </CardMedia>
                    <CardText >
                    {event.time? 
                        <h4>{new Date(event.time).toDateString()}</h4>:
                        <h4>{new Date(event.date).toDateString()}</h4>
                    }
                    </CardText>
                    <CardActions>
                        <Row center="xs" style={{padding:2}}>
                            <Col xs={4}>
                                <FlatButton onClick={this.handleClick} 
                                            icon={this.state.selected ? <Favorite color="#FF3D00" /> : <FavBorder  color="#FF3D00"/> } />
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
