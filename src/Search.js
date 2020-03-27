import React from 'react';
import './Search.css'

class SearchBar extends React.Component {
  render() {
    return (
      <div>
        <SearchInput
          value={this.props.query}
          onQueryChange={this.props.onQueryChange}
          onSelectChange={this.props.onSelectChange}
          onSubmit={this.props.onSubmit}
        />
      </div>
    )
  }
}

class SearchInput extends React.Component {
  render() {
    return (
      <form>
        <label>
          Search By :
        </label>
        <select className="Search-select"
          onChange={this.props.onSelectChange}>
          <option value="date">Date</option>
          <option value="author">Author</option>
        </select>
        <input placeholder="Search by Date or Author" className="Search-input"
          value={this.props.value}
          onChange={this.props.onQueryChange}
        />
        <button onClick={this.props.onSubmit}>Submit</button>
      </form>

    );
  }
}

export default SearchBar;