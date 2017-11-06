import React from 'react';
import Book from './Book';

function Bookshelf(props) {
  const {category, books, moveBook} = props;

  return (
    <div>
      <div className="bookshelf">
        <h2 className="bookshelf-title">{category}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <li key={book.id}>
                <Book book={book} moveBook={moveBook} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default Bookshelf;