import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

class Search extends Component {

  state = {
    books: []
  };

  // Clears the books listed in the search results.
  clearResults = () => this.setState({books: []});

  /**
   * Gets the books based on the query.
   * @param {string} query The search query to perform.
   */
  performSearch = (query) => {
    this.setState({books: []});
    if (query) {
      return BooksAPI.search(query.trim(), 20)
        .then((results) => {
          if (results.error) {
            this.clearResults();
          } else {
            this.setState({books: results});
          }
        });
    } else {
      this.clearResults();
    }  
  };

  render() {
    const {moveBook, getShelf} = this.props,
          {performSearch} = this,
          {books} = this.state;

    return (
      <div className="search-books">
        <SearchBar onPerformSearch={performSearch} />
        <SearchResults results={books} moveBook={moveBook} getShelf={getShelf} />
      </div>
    );
  }
}

Search.propTypes = {
  moveBook: PropTypes.func.isRequired,
  getShelf: PropTypes.func.isRequired
};

export default Search;