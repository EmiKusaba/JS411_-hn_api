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
      stories: []
    };

    this.fetchData = this.fetchData.bind(this);
    this.onQueryChange = this.onQueryChange.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const url = `http://hn.algolia.com/api/v1/search?query=${this.state.query}&tags=story`;
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
    console.log(query);
    this.setState({
      query: query,
    });    
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
          />
        </header>
        <StoryList stories={this.state.stories} />
      </div>
    );
  }
}

export default App;


