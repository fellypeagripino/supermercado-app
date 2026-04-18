const express = require('express');
const cors = require('cors');
const db = require('./database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const SEGREDO = 'supermercado123';

app.use(cors());
app.use(express.json());

// ===== LOGIN =====
app.post('/login', (req, res) => {
  const { email, senha } = req.body;
  const usuario = db.prepare('SELECT * FROM usuarios WHERE email = ?').get(email);
  if (!usuario) return res.status(401).json({ erro: 'Usuário não encontrado' });
  const senhaCorreta = bcrypt.compareSync(senha, usuario.senha);
  if (!senhaCorreta) return res.status(401).json({ erro: 'Senha incorreta' });
  const token = jwt.sign({ id: usuario.id }, SEGREDO);
  res.json({ token, nome: usuario.nome });
});

// ===== USUÁRIOS =====
app.get('/usuarios', (req, res) => {
  const usuarios = db.prepare('SELECT id, nome, email, cpf FROM usuarios').all();
  res.json(usuarios);
});

app.post('/usuarios', (req, res) => {
  const { nome, email, senha, cpf } = req.body;
  const hash = bcrypt.hashSync(senha, 10);
  const result = db.prepare('INSERT INTO usuarios (nome, email, senha, cpf) VALUES (?, ?, ?, ?)').run(nome, email, hash, cpf);
  res.json({ id: result.lastInsertRowid });
});

app.put('/usuarios/:id', (req, res) => {
  const { nome, email, cpf } = req.body;
  db.prepare('UPDATE usuarios SET nome=?, email=?, cpf=? WHERE id=?').run(nome, email, cpf, req.params.id);
  res.json({ sucesso: true });
});

app.delete('/usuarios/:id', (req, res) => {
  db.prepare('DELETE FROM usuarios WHERE id=?').run(req.params.id);
  res.json({ sucesso: true });
});

// ===== PRODUTOS =====
app.get('/produtos', (req, res) => {
  const produtos = db.prepare('SELECT * FROM produtos').all();
  res.json(produtos);
});

app.post('/produtos', (req, res) => {
  const { nome, preco, preco_promocao, tipo, descricao, validade } = req.body;
  const result = db.prepare('INSERT INTO produtos (nome, preco, preco_promocao, tipo, descricao, validade) VALUES (?, ?, ?, ?, ?, ?)').run(nome, preco, preco_promocao, tipo, descricao, validade);
  res.json({ id: result.lastInsertRowid });
});

app.put('/produtos/:id', (req, res) => {
  const { nome, preco, preco_promocao, tipo, descricao, validade } = req.body;
  db.prepare('UPDATE produtos SET nome=?, preco=?, preco_promocao=?, tipo=?, descricao=?, validade=? WHERE id=?').run(nome, preco, preco_promocao, tipo, descricao, validade, req.params.id);
  res.json({ sucesso: true });
});

app.delete('/produtos/:id', (req, res) => {
  db.prepare('DELETE FROM produtos WHERE id=?').run(req.params.id);
  res.json({ sucesso: true });
});

// ===== PROMOÇÕES =====
app.put('/produtos/:id/promocao', (req, res) => {
  const { em_promocao, preco_promocao } = req.body;
  db.prepare('UPDATE produtos SET em_promocao=?, preco_promocao=? WHERE id=?').run(em_promocao, preco_promocao, req.params.id);
  res.json({ sucesso: true });
});

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});