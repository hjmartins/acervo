import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import BookForm from '../components/BookForm';
function AddBookPage() {
  const navigate = useNavigate();

  const handleAddBook = async (book) => {
    try {
      await axios.post('http://localhost:3001/api/books', book);
      navigate('/library'); 
    } catch (error) {
      console.error('Erro ao adicionar livro:', error);
    }
  };
  return (
    <div>
      <NavBar />
      <h2>Adicionar Novo Livro</h2>
      <BookForm onSubmit={handleAddBook} />
      <div>
      </div>
    </div>
    
  );
}

export default AddBookPage;
