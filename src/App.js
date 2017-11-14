import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import './App.css';
import Header from './Header';
import Bookshelf from './Bookshelf';
import Search from './Search';
import { SHELVES } from './constants/shelves';

class BooksApp extends React.Component {
  state = {
    books: []
  };

  /**
   * Removes the given book from its current shelf and places it on another shelf.
   * @param  {string} shelf The new shelf for the book.
   * @param  {Object} book  The book to move.
   */
  moveBook = (shelf, bookToUpdate) => BooksAPI.update(bookToUpdate, shelf)
    .then(() => {
      bookToUpdate.shelf = shelf;
      this.setState(prevState => ({
        books: prevState.books.filter(book => book.id !== bookToUpdate.id).concat(bookToUpdate)
      }));
    });
  
  /**
   * Gets the shelf that the book in the search results is currently sitting on.
   * @param  {Object} book The book to search for in the bookshelves.
   * @return {string}      The name of the shelf that the book is currently sitting on.
   */
  getShelf = (book) => {
    const foundBook = this.state.books.find(item => item.id === book.id);
    return foundBook ? foundBook.shelf : SHELVES.none;
  };
  
  componentDidMount() {
    let sortBooks;

    // Gets all the books and distributes them to the correct shelves.
    BooksAPI.getAll().then((books) => {
      this.setState({books});
    });
  }

  render() {
    const CATEGORIES = {
      READING: 'Reading',
      WANT_TO_READ: 'Want to Read',
      READ: 'Read'
    };

    const {books} = this.state;

    return (
      <div className="app">
        <Switch>
          <Route exact path="/search" render={() => (
            <Search moveBook={this.moveBook} getShelf={this.getShelf} />
          )} />
          <Route exact path="/" render={() => (
            <div className="list-books">
              <Header />
              <div className="list-books-content">
                <Bookshelf 
                  category={CATEGORIES.READING} 
                  books={books.filter(book => book.shelf === SHELVES.currentlyReading)} 
                  moveBook={this.moveBook} 
                />
                <Bookshelf 
                  category={CATEGORIES.WANT_TO_READ} 
                  books={books.filter(book => book.shelf === SHELVES.wantToRead)} 
                  moveBook={this.moveBook} 
                />
                <Bookshelf 
                  category={CATEGORIES.READ} 
                  books={books.filter(book => book.shelf === SHELVES.read)} 
                  moveBook={this.moveBook} 
                />
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )} />
          <Route component={() => (
            <p>Sorry. This page does not exist.</p>
          )} />
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
