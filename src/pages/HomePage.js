// src/pages/HomePage.js
import React from 'react';
import NavBar from '../components/NavBar';
import BookSearch from '../components/BookSearch';
import AddBookButton from '../components/AddBookButton';
import SummaryCard from '../components/SummaryCard';
import BookList from '../components/BookList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css';
import myImage from './image.jpg';
const recentBooks = [
  { id: 1, title: 'O Senhor dos Anéis: A Sociedade do Anel', rating: '⭐⭐⭐⭐⭐' },
  { id: 2, title: 'O Morro dos Ventos Uivantes', rating: '⭐⭐⭐⭐' },
  { id: 3, title: 'Cem Anos de Solidão', rating: '⭐⭐⭐⭐⭐' }
];

const popularBooks = [
  { id: 9, title: 'Crime e Castigo', rating: '⭐⭐⭐⭐⭐', status: 'Lido' },
  { id: 10, title: 'O Grande Gatsby', rating: '⭐⭐⭐⭐⭐', status: 'Lido' },
  { id: 15, title: 'Os Miseráveis', rating: '⭐⭐⭐⭐⭐', status: 'Lido' }
];

const HomePage = () => {
  return (
    <div className="home-page">
      <NavBar />
      <div className="container mt-4">
        <div className="row mb-4">
          <div className="col-md-6">
            <img src={myImage} alt="Estante de livros" className="shelf-image img-fluid" />
          </div>
          <div className="col-md-6">
            <div className="search-section">
              <BookSearch />
              <AddBookButton />
            </div>
          </div>
        </div>
        <div className="row lists-section">
          <div className="col-md-12 mb-4">
            <BookList title="Últimos livros adicionados" books={recentBooks} />
          </div>
          <div className="col-md-12 mb-4">
            <SummaryCard />
          </div>
          <div className="col-md-12 mb-4">
            <BookList title="Livros mais lidos" books={popularBooks} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
