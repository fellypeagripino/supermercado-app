const Database = require('better-sqlite3');
const db = new Database('supermercado.db');

// Cria tabela de usuários
db.exec(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    senha TEXT NOT NULL,
    cpf TEXT NOT NULL
  ) 
`);
 
// Cria tabela de produtos
db.exec(`
  CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    preco REAL not NULL,
    preco_promocao REAL,
    tipo TEXT,
    descricao TEXT,
    validade TEXT,
    em_promocao INTEGER DEFAULT 0
  )
`);

console.log('Banco de dados pronto!');

module.exports = db;


    
    
    
