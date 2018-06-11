import React, { Component } from 'react';

class Result extends Component {
  render() {
    return (
      <div class='result-wrapper'>
        {this.props.value}
      </div>
    );
  }
}

export default Result;
