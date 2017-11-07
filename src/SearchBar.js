import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SearchBar extends Component {
  state = {
    query: ''
  };

  /**
   * Updates the search query in state and calls the search function handed to the component.
   * @param {string} query The query with which to perform the search.
   */
  search = (query) => {
    this.setState({query});
    this.props.onPerformSearch(query);
  };

  render() { 
    return (
      <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link>
        <div className="search-books-input-wrapper">
          <input 
            type="text"
            value={this.state.query} 
            placeholder="Search by title or author"
            onChange={(e) => this.search(e.target.value)}
          />
        </div>
      </div>
    );
  }
}

export default SearchBar;