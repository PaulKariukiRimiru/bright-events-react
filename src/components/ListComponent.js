import React, { Component } from 'react';
import { List }from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Subheader } from 'material-ui';
import ListItemComponent from './ListItemComponent';
export default class ListComponent extends Component {
	render() {

		return (
			<MuiThemeProvider>
					
				<div >
					<List >
						<Subheader> Users attending </Subheader>
						{this.props.rsvpList.map((rsvp, index) => {
							return(
								<ListItemComponent key={index} rsvp={rsvp} onToggleRsvpStatus={this.props.onToggleRsvpStatus} />
							);
						})}

					</List>
						
				</div>
			</MuiThemeProvider>
		)
	}
}
