import React from "react";

export default class Message extends React.Component {

  render() {
    return(
      <li>
        <strong>{this.props.message.userId}</strong> {this.props.message.text}
      </li>
    )
  }
}
