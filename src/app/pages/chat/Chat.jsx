import React, { Component } from "react";
import InputText from "../../component/InputText";
import Message from "../../component/message/Message";
import Status from "../../component/status/Status";
import "./chat.css";

const baseURL = "ws://localhost:8080/chat";

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ws: undefined,
      username: "",
      message: "",
      messages: [],
    };
  }

  render() {
    const { ws, messages } = this.state;
    return (
      <div className="chat">
        <h1>webchat</h1>
        <Status status={ws ? "connected" : "disconnected"} />
        {ws && <Message message={messages} />}
        <div className="chat-input">
          <InputText
            placeholder={ws ? "Enter message" : "Write username"}
            onChange={(value) =>
              ws ? this.setMessage(value) : this.setUsername(value)
            }
            defaultValue={ws ? this.state.message : this.state.username}
          />
          <button
            type="button"
            onClick={() => (ws ? this.sendMessage() : this.enterChat())}
          >
            {ws ? "sent" : "login"}
          </button>
        </div>
      </div>
    );
  }

  enterChat() {
    const { username } = this.state;
    let ws = new WebSocket(baseURL + `?username=${username}`);

    ws.onopen = (evt) => {
      console.log("websocket open!", { evt });
    };
    ws.onclose = (evt) => {
      console.log("websocket close!", { evt });
    };
    ws.onmessage = (msg) => {
      console.log("websocket message:", { msg });
      this.setMessages(msg.data);
    };
    ws.onerror = (err) => {
      console.log("websocket error:", { err });
    };

    this.setState({ ws, username: "" });
  }

  sendMessage() {
    const { ws, message } = this.state;
    ws.send(message);
    this.setMessage(" ");
  }

  setUsername(value) {
    this.setState({ username: value });
  }

  setMessage(value) {
    this.setState({ message: value });
  }

  setMessages(value) {
    let messages = this.state.messages.concat([JSON.parse(value)]);
    this.setState({ messages });
  }
}
