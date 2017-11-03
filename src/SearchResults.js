import React, { Component } from 'react';

class SearchResults extends Component {
  render() {
    return (
      <div className="search-books-results">
        <ol className="books-grid">
          {this.props.results.map((book) => (
            <li key={book.id}>{book.title}</li>
          ))}
        </ol>
      </div>
    );
  }
}

export default SearchResults;