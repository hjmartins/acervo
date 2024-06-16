// src/components/BookDetail.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BookForm from './BookForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BookDetail.css';

function BookDetail() {
  const { id } = useParams();  // Obtém o ID do livro a partir da URL
  const [book, setBook] = useState(null);  // Estado para armazenar detalhes do livro
  const [isEditing, setIsEditing] = useState(false);  // Estado para controlar o modo de edição
  const navigate = useNavigate();  // Hook de navegação para redirecionar o usuário

  useEffect(() => {
    const fetchBook = async () => {
      try {
        // Realiza uma requisição GET para obter os detalhes do livro pelo ID
        const response = await axios.get(`http://localhost:3001/api/books/${id}`);
        setBook(response.data);  // Armazena os dados do livro no estado
      } catch (error) {
        console.error('Erro ao buscar detalhes do livro:', error);
      }
    };

    fetchBook();  // Chama a função para buscar os detalhes do livro
  }, [id]);  // Dependência do useEffect para refazer a busca se o ID mudar

  const handleEdit = async (updatedBook) => {
    try {
      // Atualiza o livro com as novas informações
      await axios.put(`http://localhost:3001/api/books/${id}`, updatedBook);
      setIsEditing(false);  // Desativa o modo de edição
      setBook(updatedBook);  // Atualiza o estado com o livro atualizado
    } catch (error) {
      console.error('Erro ao atualizar livro:', error);
    }
  };

  if (!book) {
    return <div className="loading-message">Carregando...</div>;  // Exibe mensagem de carregamento enquanto busca os dados
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h2>Detalhes do Livro</h2>
        </div>
        <div className="card-body">
          {isEditing ? (
            <BookForm initialBook={book} onSubmit={handleEdit} />
          ) : (
            <>
              <div className="mb-3">
                <h4><strong>Título:</strong> {book.title}</h4>
              </div>
              <div className="mb-3">
                <p><strong>Autor:</strong> {book.author}</p>
              </div>
              <div className="mb-3">
                <p><strong>Gênero:</strong> {book.genre}</p>
              </div>
              <div className="mb-3">
                <p><strong>Ano:</strong> {book.year}</p>
              </div>
              <div className="mb-3">
                <p><strong>Comentário:</strong> {book.comment}</p>
              </div>
              <div className="d-flex justify-content-between">
                <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Editar</button>
                <button className="btn btn-secondary" onClick={() => navigate('/library')}>Voltar ao Acervo</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
