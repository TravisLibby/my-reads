import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

function SearchResults(props) {
  const {results, moveBook} = props;

  return (
    <div className="search-books-results">
      <ol className="books-grid">
        {results.map((book) => (
          <li key={book.id}>
            <Book book={book} moveBook={moveBook} />
          </li>
        ))}
      </ol>
    </div>
  );
}

SearchResults.propTypes = {
  books: PropTypes.array.isRequired,
  moveBook: PropTypes.func.isRequired
};

export default SearchResults;