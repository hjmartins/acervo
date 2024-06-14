// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand"><Link to="/">Minha Biblioteca</Link></div>
      <div className="navbar-links">
        <Link to="/library">Meu acervo</Link>
        {/*<Link to="/metricas">Métricas</Link>*/}
        <Link to="/wishlist">Lista de Compras</Link>
        <Link to="/configuracao">Configuração</Link>
      </div>
    </nav>
  );
};

export default NavBar;
