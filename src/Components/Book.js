import React from 'react';

class Book extends React.Component {
    render() {
        return (
            
            <li>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url("${(this.props.book.imageLinks && this.props.book.imageLinks.thumbnail) || "" }")` }}></div>
                    <div className="book-shelf-changer">
                        <select value ={this.props.book.shelf || "None"} onChange={(e) => {this.props.updateBook(this.props.book, e.target.value) /*calling the update book method*/}}> {}
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
            <div className="book-title">{this.props.book.title || "No Author"}</div>
            <div className="book-authors">{(this.props.book.authors && this.props.book.authors[0]) || "No Author"/*  "No Author" is put in as an error handler so that if a book has no author(i.e . the author key doesn't exist), the  string "No Author" is displayed.*/ } </div> 
            </div>
            </li>
            
             
        );
    }
}

export default Book; // This is done to ensure what is returned in the
//class above displays on the webpage. If not, an error message displays instead

            