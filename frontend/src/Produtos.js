import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [tipo, setTipo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [validade, setValidade] = useState('');
  const [editando, setEditando] = useState(null);
  const navigate = useNavigate();

  const carregar = async () => {
    const res = await axios.get('http://localhost:3001/produtos');
    setProdutos(res.data);
  };

  useEffect(() => { carregar(); }, []);

  const editar = (p) => {
    setEditando(p.id);
    setNome(p.nome);
    setPreco(p.preco);
    setTipo(p.tipo);
    setDescricao(p.descricao);
    setValidade(p.validade);
  };

  const salvar = async () => {
    if (editando) {
      await axios.put(`http://localhost:3001/produtos/${editando}`, { nome, preco: parseFloat(preco), preco_promocao: 0, tipo, descricao, validade });
      setEditando(null);
    } else {
      await axios.post('http://localhost:3001/produtos', { nome, preco: parseFloat(preco), preco_promocao: 0, tipo, descricao, validade });
    }
    setNome(''); setPreco(''); setTipo(''); setDescricao(''); setValidade('');
    carregar();
  };

  const remover = async (id) => {
    if (window.confirm('Remover produto?')) {
      await axios.delete(`http://localhost:3001/produtos/${id}`);
      carregar();
    }
  };

  const aplicarPromocao = async (id) => {
    const v = prompt('Preço promocional:');
    if (v) {
      await axios.put(`http://localhost:3001/produtos/${id}/promocao`, { em_promocao: 1, preco_promocao: parseFloat(v) });
      carregar();
    }
  };

  const removerPromocao = async (id) => {
    await axios.put(`http://localhost:3001/produtos/${id}/promocao`, { em_promocao: 0, preco_promocao: 0 });
    carregar();
  };

  return (
    <div style={{ padding:'20px' }}>
      <button onClick={() => { localStorage.clear(); window.location.href='/'; }} style={{ position:'fixed', top:'10px', right:'10px', padding:'8px 18px', background:'#000000', color:'white', border:'none', borderRadius:'6px', cursor:'pointer', zIndex:999 }}><FiLogOut /> Sair</button>

      <h1 style={{ fontStyle:'italic', fontSize:'36px', color:'#313331' }}>🛒 Gerenciamento de Produtos</h1>
      <button onClick={() => navigate('/usuarios')} style={{ marginBottom:'20px', padding:'8px 20px', background:'#ff5100', color:'white', border:'none', borderRadius:'5px', cursor:'pointer' }}>👥 Ir para Usuários</button>

      <h2 style={{ color:'#000000' }}>Cadastrar Produto</h2>
      <div>
        <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} style={{ margin:'4px', padding:'6px', width:'200px' }} />
        <input placeholder="Preço" value={preco} onChange={e => setPreco(e.target.value)} style={{ margin:'4px', padding:'6px', width:'100px' }} />
        <input placeholder="Tipo" value={tipo} onChange={e => setTipo(e.target.value)} style={{ margin:'4px', padding:'6px', width:'150px' }} />
        <input placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} style={{ margin:'4px', padding:'6px', width:'200px' }} />
        <input placeholder="Validade" value={validade} onChange={e => setValidade(e.target.value)} style={{ margin:'4px', padding:'6px', width:'150px' }} />
        <button onClick={salvar} style={{ margin:'4px', padding:'8px 20px', background:'#4CAF50', color:'white', border:'none', borderRadius:'5px', cursor:'pointer' }}>{editando ? 'Salvar' : 'Cadastrar'}</button>
        {editando && <button onClick={() => { setEditando(null); setNome(''); setPreco(''); setTipo(''); setDescricao(''); setValidade(''); }} style={{ margin:'4px', padding:'8px 20px', background:'#757575', color:'white', border:'none', borderRadius:'5px', cursor:'pointer' }}>Cancelar</button>}
      </div>

      <h2 style={{ color:'#000000' }}>Lista de Produtos</h2>
      <p style={{ color:'#2c642c', marginBottom:'10px' }}>Total: {produtos.length} produto(s) cadastrado(s)</p>
      <table border="1" cellPadding="8" style={{ width:'100%', borderCollapse:'collapse' }}>
        <thead>
          <tr>
            <th style={{ background:'#818181', color:'white', padding:'10px' }}> Nome</th>
            <th style={{ background:'#125a16', color:'white', padding:'10px' }}> Preço</th>
            <th style={{ background:'#4e0e53', color:'white', padding:'10px' }}> Tipo</th>
            <th style={{ background:'#466cd4', color:'white', padding:'10px' }}> Validade</th>
            <th style={{ background:'#FF9800', color:'white', padding:'10px' }}> Promoção</th>
            <th style={{ background:'#818181', color:'white', padding:'10px' }}> Ações</th>
          </tr>
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
                  ? <button onClick={() => aplicarPromocao(p.id)} style={{ margin:'2px', padding:'4px 10px', background:'#FF9800', color:'white', border:'none', borderRadius:'3px', cursor:'pointer' }}>Promoção</button>
                  : <button onClick={() => removerPromocao(p.id)} style={{ margin:'2px', padding:'4px 10px', background:'#9E9E9E', color:'white', border:'none', borderRadius:'3px', cursor:'pointer' }}>Rem. Promo</button>}
                <button onClick={() => editar(p)} style={{ margin:'2px', padding:'4px 10px', background:'#1565c0', color:'white', border:'none', borderRadius:'3px', cursor:'pointer' }}>Editar</button>
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