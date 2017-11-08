import React from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import './App.css';
import Header from './Header';
import Bookshelf from './Bookshelf';
import Search from './Search';
import { SHELVES } from './constants/shelves';

class BooksApp extends React.Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  };

  /**
   * Removes the given book from its current shelf and places it on another shelf.
   * @param  {string} shelf The new shelf for the book.
   * @param  {Object} book  The book to move.
   */
  moveBook = (shelf, book) => BooksAPI.update(book, shelf)
    .then(() => {
      this.removeFromShelf(book);
      if (shelf !== SHELVES.none) {
        this.addToShelf(shelf, book);
      }
    });

  /**
   * Removes the given book from its current shelf.
   * @param  {Object} book The book to remove from its shelf.
   */
  removeFromShelf = (book) => {
    const {shelf, id} = book;

    if (shelf === SHELVES.currentlyReading) {
      this.removeFromCurrentlyReading(id);
    } else if (shelf === SHELVES.wantToRead) {
      this.removeFromWantToRead(id);
    } else if (shelf === SHELVES.read) {
      this.removeFromRead(id);
    }
  };

  /**
   * Adds the given book to the given shelf.
   * @param {string} shelf The new shelf for the book.
   * @param {Object} book  The book to add to the shelf.
   */
  addToShelf = (shelf, book) => {
    if (shelf === SHELVES.currentlyReading) {
      this.addToCurrentlyReading(book);
    } else if (shelf === SHELVES.wantToRead) {
      this.addToWantToRead(book);
    } else if (shelf === SHELVES.read) {
      this.addToRead(book);
    }
  }

  /**
   * Removes the book with the given id from the 'Currently Reading' shelf.
   * @param  {number} id The id of the book to remove.
   */
  removeFromCurrentlyReading = (id) => {
    this.setState((prevState) => ({
      currentlyReading: prevState.currentlyReading.filter(book => book.id !== id)
    }));
  };

  /**
   * Adds the given book to the 'Currently Reading' shelf.
   * @param {Object} book The book to add to the shelf.
   */
  addToCurrentlyReading = (book) => {
    book.shelf = SHELVES.currentlyReading;
    this.setState((prevState) => ({
      currentlyReading: prevState.currentlyReading.concat([book])
    }));
  };

  /**
   * Removes the book with the given id from the 'Want to Read' shelf.
   * @param  {number} id The id of the book to remove.
   */
  removeFromWantToRead = (id) => {
    this.setState((prevState) => ({
      wantToRead: prevState.wantToRead.filter(book => book.id !== id)
    }));
  };

  /**
   * Adds the given book to the 'Want to Read' shelf.
   * @param {Object} book The book to add to the shelf.
   */
  addToWantToRead = (book) => {
    book.shelf = SHELVES.wantToRead;
    this.setState((prevState) => ({
      wantToRead: prevState.wantToRead.concat([book])
    })); 
  };

  /**
   * Removes the book with the given id from the 'Read' shelf.
   * @param  {number} id The id of the book to remove.
   */
  removeFromRead = (id) => {
    this.setState((prevState) => ({
      read: this.state.read.filter(book => book.id !== id)
    }));
  };

  /**
   * Adds the given book to the 'Read' shelf.
   * @param {Object} book The book to add to the shelf.
   */
  addToRead = (book) => {
    book.shelf = SHELVES.read;
    this.setState((prevState) => ({
      read: prevState.read.concat([book])
    }));
  };

  componentDidMount() {
    let sortBooks;

    // Gets all the books and distributes them to the correct shelves.
    BooksAPI.getAll().then((books) => {
      sortBooks(books);
    });

    /**
     * Distributes the given books to the correct shelves.
     * @param  {<Array>.Object} books The collection of books to sort.
     * @return {Object}               The updated state of the bookshelf.
     */
    sortBooks = (books) => {
      this.setState(() => {
        return {
          currentlyReading: books.filter((book) => book.shelf === 'currentlyReading'),
          wantToRead: books.filter((book) => book.shelf === 'wantToRead'),
          read: books.filter((book) => book.shelf === 'read'),
        };
      });
    };
  }

  render() {
    const CATEGORIES = {
      READING: 'Reading',
      WANT_TO_READ: 'Want to Read',
      READ: 'Read'
    };

    const {currentlyReading, wantToRead, read} = this.state;

    return (
      <div className="app">
        <Route exact path="/search" render={() => (
          <Search moveBook={this.moveBook} />
        )} />
        <Route exact path="/" render={() => (
          <div className="list-books">
            <Header />
            <div className="list-books-content">
              <Bookshelf category={CATEGORIES.READING} books={currentlyReading} moveBook={this.moveBook} />
              <Bookshelf category={CATEGORIES.WANT_TO_READ} books={wantToRead} moveBook={this.moveBook} />
              <Bookshelf category={CATEGORIES.READ} books={read} moveBook={this.moveBook} />
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    );
  }
}

export default BooksApp;
