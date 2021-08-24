import React, { Component } from "react";
import "./statue.css";

export default class Status extends Component {
  render() {
    const { status } = this.props;
    return (
      <div className="status">
        <span className={`status-icon ${status}`}></span>
        <span className="status-text">{status}</span>
      </div>
    );
  }
}
