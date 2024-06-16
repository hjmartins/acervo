import React from 'react';
import { useNavigate } from 'react-router-dom';

const BookList = ({ title, books }) => {
  const navigate = useNavigate();

  const handleBookClick = (bookId) => {
    // Navegar para a página de detalhes do livro com o ID específico
    navigate(`/book/${bookId}`);
  };

  return (
    <div className="book-list">
      <h2>{title}</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Nota</th>
            <th>Detalhes</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book._id}>
              <td>{book._id}</td>
              <td
                className="book-title"
                onClick={() => handleBookClick(book._id)}
                style={{ cursor: 'pointer' }} // Adiciona um estilo de cursor para indicar que é clicável
              >
                {book.title}
              </td>
              <td>{book.rating}</td>
              <td>
                <button
                  className="details-button"
                  onClick={() => navigate(`/book/${book._id}`)}
                >
                  {'>'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
