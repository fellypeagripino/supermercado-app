import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:3001/login', { email, senha });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('nome', res.data.nome);
      navigate('/produtos');
    } catch (e) {
      setErro('Email ou senha incorretos!');
    }
  };

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:'100vh', background:'#f1f8f1' }}>
      <div style={{ background:'white', padding:'40px', borderRadius:'16px', width:'380px', boxShadow:'0 8px 32px rgba(0,0,0,0.12)', textAlign:'center' }}>
        
        <div style={{ fontSize:'40px', marginBottom:'4px' }}>🛒</div>
        <h1 style={{ fontSize:'28px', color:'#2e7d32', fontWeight:'900', letterSpacing:'1px' }}>Supermercado</h1>
        <h2 style={{ fontSize:'22px', color:'#F03A17', fontWeight:'900', letterSpacing:'2px', marginBottom:'4px' }}>AGRIPINO</h2>
        <p style={{ color:'#888', fontSize:'13px', marginBottom:'28px' }}>Sistema Administrativo</p>

        {erro && <p style={{ color:'red', marginBottom:'12px', fontSize:'14px' }}>{erro}</p>}

        <div style={{ textAlign:'left', marginBottom:'14px' }}>
          <label style={{ fontSize:'13px', color:'#555', fontWeight:'600', display:'block', marginBottom:'6px' }}>Insira seu e-mail</label>
          <input
            placeholder="exemplo@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width:'100%', padding:'12px', border:'1px solid #c8e6c9', borderRadius:'8px', fontSize:'14px', outline:'none', boxSizing:'border-box' }}
          />
        </div>

        <div style={{ textAlign:'left', marginBottom:'20px' }}>
          <label style={{ fontSize:'13px', color:'#555', fontWeight:'600', display:'block', marginBottom:'6px' }}>Insira sua senha</label>
          <input
            placeholder="••••••••"
            type="password"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            style={{ width:'100%', padding:'12px', border:'1px solid #c8e6c9', borderRadius:'8px', fontSize:'14px', outline:'none', boxSizing:'border-box' }}
          />
        </div>

        <button
          onClick={handleLogin}
          style={{ width:'100%', padding:'13px', background:'#2e7d32', color:'white', border:'none', borderRadius:'8px', fontSize:'16px', fontWeight:'700', cursor:'pointer' }}
        >
          Entrar
        </button>

      </div>
    </div>
  );
}

export default Login;