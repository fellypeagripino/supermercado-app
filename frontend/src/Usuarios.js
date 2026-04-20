import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cpf, setCpf] = useState('');
  const navigate = useNavigate();

  const carregar = async () => {
    const res = await axios.get('http://localhost:3001/usuarios');
    setUsuarios(res.data);
  };

  useEffect(() => { carregar(); }, []);

  const cadastrar = async () => {
    await axios.post('http://localhost:3001/usuarios', { nome, email, senha, cpf });
    setNome(''); setEmail(''); setSenha(''); setCpf('');
    carregar();
  };

  const remover = async (id) => {
    await axios.delete(`http://localhost:3001/usuarios/${id}`);
    carregar();
  };

  return (
    <div style={{ padding:'20px' }}>
      <h1 style={{ fontStyle:'italic', fontSize:'36px', color:'#313331' }}>👥 Gerenciamento de Usuários</h1>
      <button onClick={() => { localStorage.clear(); window.location.href='/'; }} style={{ marginBottom:'20px', padding:'8px 18px', background:'#c62828', color:'white', border:'none', borderRadius:'6px', cursor:'pointer', float:'right' }}><FiLogOut />Sair</button>
      <button onClick={() => navigate('/produtos')} style={{ marginBottom:'20px', padding:'8px 20px', background:'#2196F3', color:'white', border:'none', borderRadius:'5px', cursor:'pointer' }}>🛒 Ir para Produtos</button>

      <h2>Cadastrar Usuário</h2>
      <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} style={{ margin:'4px', padding:'6px', width:'200px' }} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ margin:'4px', padding:'6px', width:'200px' }} />
      <input placeholder="Senha" type="password" value={senha} onChange={e => setSenha(e.target.value)} style={{ margin:'4px', padding:'6px', width:'150px' }} />
      <input placeholder="CPF" value={cpf} onChange={e => setCpf(e.target.value)} style={{ margin:'4px', padding:'6px', width:'150px' }} />
      <button onClick={cadastrar} style={{ margin:'4px', padding:'8px 20px', background:'#4CAF50', color:'white', border:'none', borderRadius:'5px', cursor:'pointer' }}>Cadastrar</button>

      <h2>Lista de Usuários</h2>
      <p style={{color:'#1f4e1f', marginBottom:'10px'}}>Total: {usuarios.length} usuário(s) cadastrado(s)</p>
      <table border="1" cellPadding="8" style={{ width:'100%', borderCollapse:'collapse' }}>
        <thead style={{ background:'#f0f0f0' }}>
          <tr><th>Nome</th><th>Email</th><th>CPF</th><th>Ações</th></tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id}>
              <td>{u.nome}</td>
              <td>{u.email}</td>
              <td>{u.cpf}</td>
              <td>
                <button onClick={() => remover(u.id)} style={{ padding:'4px 10px', background:'#f44336', color:'white', border:'none', borderRadius:'3px', cursor:'pointer' }}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Usuarios;