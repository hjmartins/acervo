import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BookForm from './BookForm';

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`./api/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Erro ao buscar detalhes do livro:', error);
      }
    };

    fetchBook();
  }, [id]);


  const handleEdit = async (updatedBook) => {
    try {
      await axios.put(`./api/books/${id}`, updatedBook);
      setIsEditing(false);
      setBook(updatedBook);
    } catch (error) {
      console.error('Erro ao atualizar livro:', error);
    }
  };

  if (!book) return <div>Carregando...</div>;

  return (
    <div>
      <h2>Detalhes do Livro</h2>
      {isEditing ? (
        <BookForm initialBook={book} onSubmit={handleEdit} />
      ) : (
        <>
          <p><strong>Título:</strong> {book.title}</p>
          <p><strong>Autor:</strong> {book.author}</p>
          <p><strong>Gênero:</strong> {book.genre}</p>
          <p><strong>Ano:</strong> {book.year}</p>
          <button onClick={() => setIsEditing(true)}>Editar</button>
          <button onClick={() => navigate('/library')}>Voltar ao Acervo</button>
        </>
      )}
    </div>
  );
}

export default BookDetail;
