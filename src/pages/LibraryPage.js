import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import BookList from '../components/BookList';
import NavBar from '../components/NavBar';

const initialBooks = [
  { id: 1, title: 'O Senhor dos Anéis: A Sociedade do Anel', rating: '⭐⭐⭐⭐⭐' },
  { id: 2, title: 'O Morro dos Ventos Uivantes', rating: '⭐⭐⭐⭐' },
  { id: 3, title: 'Cem Anos de Solidão', rating: '⭐⭐⭐⭐⭐' },
  { id: 4, title: 'Crime e Castigo', rating: '⭐⭐⭐⭐⭐', status: 'Lido' },
  { id: 5, title: 'O Grande Gatsby', rating: '⭐⭐⭐⭐⭐', status: 'Lido' },
  { id: 6, title: 'Os Miseráveis', rating: '⭐⭐⭐⭐⭐', status: 'Lido' }
];

function LibraryPage() {
  const [books, setBooks] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const searchQuery = searchParams.get('search') || '';
        const response = await axios.get(`http://localhost:3001/api/books?search=${searchQuery}`);
        console.log('Books fetched:', response.data); // Verificar se a busca retorna corretamente
        setBooks(response.data);
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
      }
    };

    fetchBooks();
  }, [location.search]);

  const sortById = () => {
    const sortedBooks = [...books].sort((a, b) => a.id - b.id);
    setBooks(sortedBooks);
  };

  const sortByTitle = () => {
    const sortedBooks = [...books].sort((a, b) => a.title.localeCompare(b.title));
    setBooks(sortedBooks);
  };

  const sortByStatus = () => {
    const sortedBooks = [...books].sort((a, b) => {
      if (a.status === 'Lido' && b.status !== 'Lido') return 1;
      if (a.status !== 'Lido' && b.status === 'Lido') return -1;
      return 0;
    });
    setBooks(sortedBooks);
  };

  return (
    <div>
      <NavBar />
      <div>
        <button onClick={sortById}>Ordenar por ID</button>
        <button onClick={sortByTitle}>Ordenar por Nome</button>
        <button onClick={sortByStatus}>Ordenar por Status</button>
      </div>
      <BookList books={books.length > 0 ? books : initialBooks} />
    </div>
  );
}

export default LibraryPage;

