import React, { Component } from 'react';

class Search extends Component {
  handleChange = (e) => {
    const { value } = e.target;
    this.props.onChange(value);
  }

  render() {
    return (
      <div id='search-wrapper'>
        ^
        <input
          type='text'
          onChange={this.handleChange}
        />
        $
      </div>
    );
  }
}

export default Search;
