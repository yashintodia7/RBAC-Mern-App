
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const box = { maxWidth: 420, margin: '60px auto', padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 6px 18px rgba(0,0,0,0.08)' };
  const input = { width: '100%', padding: 10, margin: '8px 0', borderRadius: 6, border: '1px solid #ddd' };
  const btn = { width: '100%', background: '#2563eb', color: 'white', padding: 10, border: 'none', borderRadius: 6, cursor: 'pointer' };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/home');
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed';
      alert(msg);
    }
  };

  return (
    <div style={box}>
      <h2 style={{ textAlign: 'center' }}>Login</h2>
      <form onSubmit={onSubmit}>
        <input style={input} type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input style={input} type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button style={btn} type="submit">Login</button>
      </form>
    </div>
  );
}
