import React from 'react';
import logo from './logo.svg';
import StoryList from './Story';
import SearchBar from './Search';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      queryType: "",
      stories: []
    };

    this.fetchData = this.fetchData.bind(this);
    this.onQueryChange = this.onQueryChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    let url = "http://hn.algolia.com/api/v1/search_by_date?tags=story";

    if (this.state.query.length > 0) {
      if (this.state.queryType === "date") {
        // Assume GMT 
        // Assume we're only searching for the whole day
        const unixTimestampStart = Date.parse(`${this.state.query} 00:00:00 GMT`) / 1000
        const unixTimestampEnd = Date.parse(`${this.state.query} 23:59:59 GMT`) / 1000
        if (!isNaN(unixTimestampStart) && !isNaN(unixTimestampEnd)) {
          url = `http://hn.algolia.com/api/v1/search_by_date?tags=story&numericFilters=created_at_i>=${unixTimestampStart},created_at_i<=${unixTimestampEnd}`;
        }
      } else if (this.state.queryType === "author") {
        url = `http://hn.algolia.com/api/v1/search?tags=story,author_${this.state.query}`;
      }
    }

    fetch(url)
      .then(response => response.json())
      .then(json => {
        const stories = json.hits || [];
        this.setState({
          stories: stories,
        });
      })
      .catch(error => console.log(`parsing failed ${error}`));
  }

  onQueryChange(e) {
    const query = e.target.value;
    this.setState({
      query: query,
    });
  }

  onSelectChange(e) {
    this.setState({
      queryType: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.fetchData();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Hacker News API</h1>
          <SearchBar
            query={this.state.query}
            onQueryChange={this.onQueryChange}
            onSelectChange={this.onSelectChange}
            onSubmit={this.onSubmit}
          />
        </header>
        <StoryList stories={this.state.stories} />
      </div>
    );
  }
}

export default App;


