import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './wishlistPage.css';
import NavBar from '../components/NavBar';

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [newBookTitle, setNewBookTitle] = useState('');

  useEffect(() => {
    // Busca os livros da lista de desejos do backend
    axios.get('http://localhost:3001/api/wishlist')
      .then(response => {
        setWishlist(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar a lista de desejos:', error);
      });
  }, []);

  const removeFromWishlist = (id) => {
    axios.delete(`http://localhost:3001/api/wishlist/${id}`)
      .then(response => {
        setWishlist(wishlist.filter(book => book._id !== id));
      })
      .catch(error => {
        console.error('Erro ao remover o livro da lista de desejos:', error);
      });
  };

  const addToWishlist = () => {
    if (!newBookTitle) return; // Não adicionar se o campo estiver vazio
    
    const newBook = {
      title: newBookTitle, // Usar o título do estado newBookTitle
    };

    axios.post('http://localhost:3001/api/wishlist', newBook)
      .then(response => {
        setWishlist([...wishlist, response.data]); // Adiciona o novo livro à wishlist atual
        setNewBookTitle(''); // Limpa o campo de entrada
      })
      .catch(error => {
        console.error('Erro ao adicionar livro à lista de desejos:', error);
      });
  };

  return (
    <div className="wishlist-page container mt-4">
      <NavBar />
      <h2 className="text-center">Minha Lista de Desejos</h2>
      
      <div className="form-group d-flex justify-content-center my-4">
        <input 
          type="text" 
          className="form-control mr-2" 
          placeholder="Digite o nome do livro"
          value={newBookTitle}
          onChange={(e) => setNewBookTitle(e.target.value)}
        />
        <button 
          className="btn btn-primary"
          onClick={addToWishlist}
        >
          Adicionar Livro
        </button>
      </div>
      
      {wishlist.length === 0 ? (
        <p className="text-center">A sua lista de desejos está vazia.</p>
      ) : (
        <ul className="list-group">
          {wishlist.map((book, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <h5 className="mb-0">{book.title}</h5>
              <button 
                className="btn btn-danger btn-sm"
                onClick={() => removeFromWishlist(book._id)}
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WishlistPage;

