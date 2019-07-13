import React, { Component } from "react";
import Search from "../Search/Search";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: "",
      results: [],
      dictionary: []
    };
  }

  componentWillMount() {
    fetch("content/english.txt")
      .then(a => a.text())
      .then(data => {
        const dictionary = data.split(/\r?\n/);
        this.setState({
          dictionary: dictionary
        });
      });
  }

  onChange = val => {
    this.setState({
      searchValue: val
    });

    const regex = new RegExp(`^${val}$`, "giu");
    const matchedWords = this.state.dictionary.filter(a => a.match(regex));
    this.setState({
      results: matchedWords
    });
  };

  render() {
    const { dictionary, results } = this.state;

    return (
      <div style={{ padding: 10, color: "#303030" }}>
        <header style={{ fontSize: 80, fontWeight: 700, textAlign: "center" }}>wordco.de</header>
        <p style={{ textAlign: "center", fontSize: 20, fontWeight: 300 }}>
          Regex searcher for words in the English language. Avoid * queries.
        </p>
        {!dictionary.length && (
          <div style={{ fontSize: 50, fontWeight: 300, textAlign: "center", marginTop: 30 }}>Loading dictionary...</div>
        )}
        {!!dictionary.length && (
          <div>
            <Search onChange={this.onChange} />
            <div style={{ fontSize: 60, fontWeight: 300, marginTop: 20 }}>
              {!results.length && "No results"}
              {!!results.length && (
                <div>
                  {results.length} results
                  <ul style={{ marginLeft: 20, marginTop: 10 }}>
                    {results.map(a => (
                      <li key={a} style={{ marginBottom: 10 }}>
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
