import React, { Component } from 'react';
import Result from '../Result/Result';
import Search from '../Search/Search';

const dictionary = [
  'north america',
  'south america',
  'africa',
  'europe',
  'asia',
  'australia',
  'antarctica',
];

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
      results: []
    };
  }

  onChange = (val) => {
    this.setState({
      searchValue: val
    });

    const regex = new RegExp(`^${val}$`, 'giu');
    const matchedWords = dictionary.filter(a => a.match(regex));
    this.setState({
      results: matchedWords
    });
  }

  render() {
    return (
      <div>
        <header>Wordco.de</header>
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
