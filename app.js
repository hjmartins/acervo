const express = require ('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Configuração da conexão com o MongoDB
mongoose.connect('mongodb://localhost:27017/acervo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err.message));

// Esquema do contador para sequência de IDs
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});

const Counter = mongoose.model('Counter', counterSchema);

// Função para obter o próximo valor de sequência
async function getNextSequenceValue(sequenceName) {
  const sequenceDocument = await Counter.findOneAndUpdate(
    { _id: sequenceName },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return sequenceDocument.seq;
}

// Esquema do modelo de Livro
const bookSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  title: String,
  author: String,
  genre: String,
  year: Number,
  rating: Number,
  comment: String,
  isbn: String
});

const Book = mongoose.model('Book', bookSchema);

// Rota para listar e buscar livros
app.get('/api/books', async (req, res) => {
  try {
    const query = req.query.search ? { $text: { $search: req.query.search } } : {};
    const books = await Book.find(query);
    res.json(books);
  } catch (err) {
    console.error('Erro ao buscar livros:', err);
    res.status(500).json({ error: 'Erro ao buscar livros' });
  }
});

// Rota para adicionar um novo livro
app.post('/api/books', async (req, res) => {
  try {
    const nextId = await getNextSequenceValue('bookId');
    const newBook = new Book({
      _id: nextId,
      ...req.body
    });
    await newBook.save();
    res.json(newBook);
  } catch (err) {
    console.error('Erro ao adicionar livro:', err);
    res.status(500).json({ error: 'Erro ao adicionar livro' });
  }
});

// Rota para buscar detalhes de um livro
app.get('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }
    res.json(book);
  } catch (err) {
    console.error('Erro ao buscar detalhes do livro:', err);
    res.status(500).json({ error: 'Erro ao buscar detalhes do livro' });
  }
});

// Rota para atualizar um livro
app.put('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }
    res.json(book);
  } catch (err) {
    console.error('Erro ao atualizar livro:', err);
    res.status(500).json({ error: 'Erro ao atualizar livro' });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
