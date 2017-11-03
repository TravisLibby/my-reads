import React from 'react';
import { Route, Link } from 'react-router-dom';
// import * as BooksAPI from './BooksAPI'
import './App.css';
import Header from './Header';
import Bookshelf from './Bookshelf';
import Search from './Search';

class BooksApp extends React.Component {
  state = {
    reading: [],
    wantToRead: [],
    read: []
  };

  render() {
    const CATEGORIES = {
      READING: 'Reading',
      WANT_TO_READ: 'Want to Read',
      READ: 'Read'
    };

    return (
      <div className="app">
        <Route exact path="/search" render={() => (
          <Search />
        )} />
        <Route exact path="/" render={() => (
          <div className="list-books">
            <Header />
            <div className="list-books-content">
              <Bookshelf category={CATEGORIES.READING} />
              <Bookshelf category={CATEGORIES.WANT_TO_READ} />
              <Bookshelf category={CATEGORIES.READ} />
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
