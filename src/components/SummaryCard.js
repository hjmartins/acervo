// src/components/SummaryCard.js
import React from 'react';

const SummaryCard = () => {
  return (
    <div className="summary-card">
      <h2>Sumário do Acervo</h2>
      <p>Livros: 99</p>
      <p>Livros Lidos: 50</p>
      <p>Livros para ler: 49</p>
      <p>Livros para comprar: 15</p>
      <button>Ver estatística</button>
    </div>
  );
};

export default SummaryCard;
