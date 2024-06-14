// src/components/BookSearch.js
import React from 'react';

const BookSearch = () => {
  return (
    <div className="book-search">
      <h2>Buscar Livro</h2>
      <div className="mb-3">
        <label htmlFor="bookName" className="form-label"></label>
        <input 
          type="text" 
          id="bookName"
          className="form-control" 
          placeholder="Digite o nome do livro" 
        />
      </div>
      <button type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off">Buscar</button>
    </div>
  );
};

export default BookSearch;
