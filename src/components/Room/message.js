import React from "react";

export default class Message extends React.Component {

	render() {
		return(
			<li>
				<strong>{this.props.message.displayName}:</strong>({this.props.message.sentAt}) {this.props.message.text}
			</li>
		)
	}
}
