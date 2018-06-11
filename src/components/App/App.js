import React, { Component } from 'react';
import Result from '../Result/Result';
import Search from '../Search/Search';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
      results: [],
      dictionary: []
    };
  }

  componentWillMount() {
    fetch('content/english.txt')
    .then(a => a.text())
    .then(data => {
      const dictionary = data.split(/\r?\n/);
      this.setState({
        dictionary: dictionary
      });
    });
  }

  onChange = (val) => {
    this.setState({
      searchValue: val
    });

    const regex = new RegExp(`^${val}$`, 'giu');
    const matchedWords = this.state.dictionary.filter(a => a.match(regex));
    this.setState({
      results: matchedWords
    });
  }

  render() {
    if(this.state.dictionary.length === 0) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <header>wordco.de</header>
        <p>Enter a regex for the word you need.</p>
        <p>Probably avoid the * operator - this runs on your browser against the entire English language.</p>
        <Search onChange={this.onChange} />
        {this.state.results.length === 0 &&
          <span>:wompwomp: no results</span>
        }
        {this.state.results.length > 0 && (
          <ul>
            {this.state.results.map(a => (
              <li key={a}>
                <Result value={a} />
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default App;
