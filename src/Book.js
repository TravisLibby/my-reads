import React from 'react';
import PropTypes from 'prop-types';
import { formatAuthors } from './services/authorService';

function Book(props) {
  const {book, moveBook} = props;

  return (
    <div className="book">
      <div className="book-top">
        {book.imageLinks && (
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
        )}
        <div className="book-shelf-changer">
          <select 
            onChange={(e) => moveBook(e.target.value, book)}
            value={book.shelf}>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{formatAuthors(book.authors)}</div>
    </div>
  );
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  moveBook: PropTypes.func.isRequired
};

export default Book;