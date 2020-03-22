import React from 'react';

class SearchBar extends React.Component {
  render() {
    return (
      <div>
        <form>
          <SearchInput
            value={this.props.query}
            onChange={this.props.onQueryChange}
          />
        </form>
      </div>
    )
  }
}

class SearchInput extends React.Component {
  render() {
    return (
      <input 
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}

export default SearchBar;