import React from 'react';
import Book from './Book'; // The code for book was abstracted to Book.js

class Shelf extends React.Component {
    //To ensure that when a new prop gets mounted, it's printed to the console
    componentDidMount() {
        console.log(this);
    }

    render() {
        return (  //Instead of using the hardcoded bookshelf-title, we will use a jsx expression as the 
            //value in the <h2> tag for each shelf in order to read the props that were given to it
            <div> 
                <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.name} </h2>
                <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        this.props.books.map((book, key) => <Book updateBook={this.props.updateBook} /* Passing the updateBook method from the shelf to the books */ book={book} key={key}/>)
                    }
                </ol>
                </div>
                </div>
            </div>
        );
    }
}

export default Shelf; /* This is done to ensure what is returned in the
                       *class above displays on the webpage. If not, an error message displays instead
                       */
