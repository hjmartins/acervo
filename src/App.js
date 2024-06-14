// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddBookPage from './pages/AddBookPage'; 
import LibraryPage from './pages/LibraryPage'; 
import BookDetail from './components/BookDetail';
import Wishlist from './pages/WishList'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-book" element={<AddBookPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/wishlist" element={<Wishlist />}/>
        <Route path="/book/:id" element={<BookDetail />} /> 
      </Routes>
    </Router>
  );
};

export default App;
