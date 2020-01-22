import React from "react";
import { Message } from '.';

export default class Messages extends React.Component {
	render() {
		return (
			<ul>
				{this.props.messages.map(message => (
					<Message key={message.uid} message={message} />
				))}
			</ul>
		)
	}
}
