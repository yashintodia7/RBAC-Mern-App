
import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { email, password, role });
      alert('Registered. Now login.');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Register failed');
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: '40px auto', padding: 24, background: '#fff', borderRadius: 8 }}>
      <h2 style={{ textAlign: 'center' }}>Register</h2>
      <form onSubmit={onSubmit}>
        <input style={{ width: '100%', padding: 10, margin: '8px 0' }} placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input style={{ width: '100%', padding: 10, margin: '8px 0' }} placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} type="password" required />
        <select value={role} onChange={e=>setRole(e.target.value)} style={{ width: '100%', padding: 10, margin: '8px 0' }}>
          <option value="user">User</option>
          <option value="editor">Editor</option>
          <option value="admin">Admin</option>
        </select>
        <button style={{ width: '100%', padding: 10, background: '#059669', color: '#fff', border: 'none', borderRadius: 6 }}>Register</button>
      </form>
    </div>
  );
}
