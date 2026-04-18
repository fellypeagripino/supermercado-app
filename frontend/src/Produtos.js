import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [tipo, setTipo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [validade, setValidade] = useState('');
  const navigate = useNavigate();

  const carregar = async () => {
    const res = await axios.get('http://localhost:3001/produtos');
    setProdutos(res.data);
  };

  useEffect(() => { carregar(); }, []);

  const cadastrar = async () => {
    await axios.post('http://localhost:3001/produtos', { nome, preco: parseFloat(preco), preco_promocao: 0, tipo, descricao, validade });
    setNome(''); setPreco(''); setTipo(''); setDescricao(''); setValidade('');
    carregar();
  };

  const remover = async (id) => {
    await axios.delete(`http://localhost:3001/produtos/${id}`);
    carregar();
  };

  const aplicarPromocao = async (id, preco_promocao) => {
    await axios.put(`http://localhost:3001/produtos/${id}/promocao`, { em_promocao: 1, preco_promocao: parseFloat(preco_promocao) });
    carregar();
  };

  const removerPromocao = async (id) => {
    await axios.put(`http://localhost:3001/produtos/${id}/promocao`, { em_promocao: 0, preco_promocao: 0 });
    carregar();
  };

  return (
    <div style={{ padding:'20px' }}>
      <h1>🛒 Gerenciamento de Produtos</h1>
      <button onClick={() => navigate('/usuarios')} style={{ marginBottom:'20px', padding:'8px 20px', background:'#4CAF50', color:'white', border:'none', borderRadius:'5px', cursor:'pointer' }}>👥 Ir para Usuários</button>

      <h2>Cadastrar Produto</h2>
      <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} style={{ margin:'4px', padding:'6px', width:'200px' }} />
      <input placeholder="Preço" value={preco} onChange={e => setPreco(e.target.value)} style={{ margin:'4px', padding:'6px', width:'100px' }} />
      <input placeholder="Tipo" value={tipo} onChange={e => setTipo(e.target.value)} style={{ margin:'4px', padding:'6px', width:'150px' }} />
      <input placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} style={{ margin:'4px', padding:'6px', width:'200px' }} />
      <input placeholder="Validade" value={validade} onChange={e => setValidade(e.target.value)} style={{ margin:'4px', padding:'6px', width:'150px' }} />
      <button onClick={cadastrar} style={{ margin:'4px', padding:'8px 20px', background:'#2196F3', color:'white', border:'none', borderRadius:'5px', cursor:'pointer' }}>Cadastrar</button>

      <h2>Lista de Produtos</h2>
      <table border="1" cellPadding="8" style={{ width:'100%', borderCollapse:'collapse' }}>
        <thead style={{ background:'#f0f0f0' }}>
          <tr><th>Nome</th><th>Preço</th><th>Tipo</th><th>Validade</th><th>Promoção</th><th>Ações</th></tr>
        </thead>
        <tbody>
          {produtos.map(p => (
            <tr key={p.id}>
              <td>{p.nome}</td>
              <td>R$ {p.preco}</td>
              <td>{p.tipo}</td>
              <td>{p.validade}</td>
              <td>{p.em_promocao ? `R$ ${p.preco_promocao}` : 'Sem promoção'}</td>
              <td>
                {!p.em_promocao
                  ? <button onClick={() => { const v = prompt('Preço promocional:'); if(v) aplicarPromocao(p.id, v); }} style={{ margin:'2px', padding:'4px 10px', background:'#FF9800', color:'white', border:'none', borderRadius:'3px', cursor:'pointer' }}>Promoção</button>
                  : <button onClick={() => removerPromocao(p.id)} style={{ margin:'2px', padding:'4px 10px', background:'#9E9E9E', color:'white', border:'none', borderRadius:'3px', cursor:'pointer' }}>Remover Promoção</button>
                }
                <button onClick={() => remover(p.id)} style={{ margin:'2px', padding:'4px 10px', background:'#f44336', color:'white', border:'none', borderRadius:'3px', cursor:'pointer' }}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Produtos;