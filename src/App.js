import React from 'react';
import logo from './logo.svg';
import StoryList from './Story';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      stories: []
    };

    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const url = "http://hn.algolia.com/api/v1/search?query=foo&tags=story";
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
  render() {
    const { isLoading, users } = this.state;
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <StoryList stories={this.state.stories} />
      </div>
    );
  }
}

export default App;


