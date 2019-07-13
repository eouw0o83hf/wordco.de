import React, { Component } from "react";

class Search extends Component {
  handleChange = e => {
    const { value } = e.target;
    this.props.onChange(value);
  };

  render() {
    return (
      <input
        type="text"
        onChange={this.handleChange}
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: 20,
          fontSize: 40,
          fontWeight: 300,
          borderWidth: 3,
          borderStyle: "solid",
          borderColor: "#303030",
          borderRadius: 4,
          color: "#303030"
        }}
        autoCapitalize="off"
      />
    );
  }
}

export default Search;
