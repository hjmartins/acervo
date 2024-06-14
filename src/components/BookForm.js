// src/components/BookForm.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function BookForm({ initialBook, onSubmit }) {
  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
    year: '',
    rating: '',
    comment: '',
    isbn: ''
  });

  useEffect(() => {
    if (initialBook) {
      setBook(initialBook);
    }
  }, [initialBook]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(book);
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="mb-3">
        <label className="form-label">Título:</label>
        <input
          type="text"
          name="title"
          value={book.title}
          onChange={handleChange}
          className="form-control"
          placeholder="Digite o título do livro"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Autor:</label>
        <input
          type="text"
          name="author"
          value={book.author}
          onChange={handleChange}
          className="form-control"
          placeholder="Digite o nome do autor"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Gênero:</label>
        <input
          type="text"
          name="genre"
          value={book.genre}
          onChange={handleChange}
          className="form-control"
          placeholder="Digite o gênero do livro"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Ano:</label>
        <input
          type="number"
          name="year"
          value={book.year}
          onChange={handleChange}
          className="form-control"
          placeholder="Digite o ano de publicação"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Nota (1-5):</label>
        <input
          type="number"
          name="rating"
          value={book.rating}
          onChange={handleChange}
          className="form-control"
          placeholder="Dê uma nota de 1 a 5"
          min="1"
          max="5"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Comentário:</label>
        <textarea
          name="comment"
          value={book.comment}
          onChange={handleChange}
          className="form-control"
          placeholder="Escreva seu comentário"
          rows="3"
        ></textarea>
      </div>
      <div className="mb-3">
        <label className="form-label">ISBN:</label>
        <input
          type="text"
          name="isbn"
          value={book.isbn}
          onChange={handleChange}
          className="form-control"
          placeholder="Digite o ISBN do livro"
        />
      </div>
      <button type="submit" className="btn btn-primary">Salvar</button>
    </form>
  );
}

export default BookForm;
