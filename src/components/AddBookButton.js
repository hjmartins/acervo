// src/components/AddBookButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddBookButton = () => {
  const navigate = useNavigate();

  const handleAddBook = () => {
    navigate('/add-book'); 
  };

  return (
    <div className="add-book">
      <button onClick={handleAddBook} class="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off">Adicionar</button>
    </div>
  );
};

export default AddBookButton;
