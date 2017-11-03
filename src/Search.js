import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

class Search extends Component {

  state = {
    books: []
  };

  /**
   * Gets the books based on the query.
   * @param  {string} query The search query to perform.
   */
  performSearch = (query) => {
    if (query) {
      return BooksAPI.search(query.trim(), 10).then(books => this.setState({books}));
    }
    this.setState({books: []});  
  };

  render() {
    return (
      <div className="search-books">
        <SearchBar onPerformSearch={this.performSearch} />
        <SearchResults results={this.state.books}/>
      </div>
    )
  }
}

export default Search;