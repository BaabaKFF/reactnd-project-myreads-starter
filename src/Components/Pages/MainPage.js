import React from 'react';
import {Link} from 'react-router-dom';
import Shelf from '../Shelf'; // The code for shelf was moved to Shelf.js
import * as BooksAPI from '../../BooksAPI'// interacting with the Api

class MainPage extends React.Component {
    //Creating a constructor method to have a starting book state.
    constructor(props) {
        super(props);
        this.state = {
            books: []
        }
    }

    //Setting up an ajax request to check for when a property of a book has been mounted
    componentDidMount(){
        BooksAPI.getAll()
        .then(resp => {
            console.log(resp);  //To ensure that when a new prop gets mounted, it's printed to the console
            this.setState({books: resp});
        });
    }

    //This method updates the state of a book by updating the book and shelf properties
    updateBook= (book, shelf)=> {
        BooksAPI.update(book, shelf)
        .then( resp => {
            book.shelf = shelf;
            this.setState(state => ({
                books: state.books.filter(b => b.id !== book.id).concat({book})
            }));
        });
    }

    render() {
        return (
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf updateBook={this.updateBook} /* Passing the updateBook method from the MainPage to the shelf */ name="Currently Reading" books={this.state.books.filter(b => b.shelf === "currentlyReading")} />
                <Shelf updateBook={this.updateBook} /* Passing the updateBook method from the MainPage to the shelf */ name="Want To Read" books={this.state.books.filter(b => b.shelf === "wantToRead")} />
                <Shelf updateBook={this.updateBook} /* Passing the updateBook method from the MainPage to the shelf */ name="Read" books={this.state.books.filter(b => b.shelf ==="read" )} />
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
            </div>    
        );
    }
}

export default MainPage; // This is done to ensure what is returned in the
//class above displays on the webpage. If not, an error message displays instead.

//