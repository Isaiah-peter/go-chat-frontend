import React, { Component } from "react";

export default class InputText extends Component {
  render() {
    const { type, placeholder, onChange, defaultValue } = this.props;
    return (
      <input
        type={type ? type : "text"}
        placeholder={placeholder ? placeholder : ""}
        onChange={(e) => onChange(e.target.value)}
        value={defaultValue}
      />
    );
  }
}
