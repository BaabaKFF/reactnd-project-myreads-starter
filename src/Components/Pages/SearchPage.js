import React from "react";
import { Link } from "react-router-dom";
import Book from "../Book";
import * as BooksAPI from "../../BooksAPI"; // interacting with the Api

class SearchPage extends React.Component {
  //Creating a constructor method to have a starting book state.
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      results: [],
      query: ""
    };
  }

  //Setting up an ajax request to check for when a property of a book has been mounted
  componentDidMount() {
    BooksAPI.getAll().then(resp => {
      //console.log(resp);  //To ensure that when a new prop gets mounted, it's printed to the console
      this.setState({ books: resp });
    });
  }

  //This updates the state after a value is passed as an input in the search bar
  updateQuery = query => {
    this.setState({ query: query }, () => this.submitSearch(query));
  };

  //This method submits the inputted query in the search
  submitSearch(query) {
    if (query === "" || query === undefined) {
      // This checks if the inputted query is empty or define
      return this.setState({ results: [] });
    }
    BooksAPI.search(this.state.query.trim()).then(res => {
      //console.log(res);
      if (res.error) {
        // if the query is empty, this empties the results list
        return this.setState({ results: [] });
      } else {
        //if the query is defined and found, the results list displays the desired query
        res.forEach(b => {
          let f = this.state.books.filter(B => B.id === b.id);
          b.shelf = f[0] ? f.shelf : "none"; //to represent when a book has no shelf property
          //console.log(f);
          if (f[0]) {
            b.shelf = f[0].shelf;
          }
        });
        return this.setState({ results: res });
      }
    });
  }

  //This method updates the state of a book by updating the book and shelf properties
  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(_resp => {
      book.shelf = shelf;
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat({ book })
      }));
    });
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query} /*Passes in the new event query event */
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {
            this.state.results.map((book, key) => <Book updateBook={this.updateBook} /* Passing the updateBook method from the shelf to the books */ book={book} key={key}/>)
            }
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage; // This is done to ensure what is returned in the
//class above displays on the webpage. If not, an error message displays instead