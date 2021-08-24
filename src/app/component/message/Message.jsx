import React, { Component } from "react";

export default class Message extends Component {
  render() {
    const { message } = this.props;
    return (
      message &&
      message.map((msg) => {
        return (
          <p key={msg.id}>
            <strong>{msg.sender}:</strong>
            {msg.body}
          </p>
        );
      })
    );
  }
}
