import React from 'react'
import './App.css'

//Importing route in the root which is this file App.js
import { Route} from 'react-router-dom'

//Importing components from the Components folder
import MainPage from './Components/Pages/MainPage';
import SearchPage from './Components/Pages/SearchPage';

class BooksApp extends React.Component {
   render() {
    // Creating components to be mounted 
    return (
      <div>
        <Route exact path= "/" component= { MainPage } />
        <Route exact path= "/search" component= { SearchPage } />
      </div>
    );
    //Routes for the SearchPage and MainPages were moved into the SearchPage.js and MainPage.js files respectively as part of creating React components
  }
}

export default BooksApp
