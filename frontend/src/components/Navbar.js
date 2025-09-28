
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  if (!user) return null;

  const navStyle = { display: 'flex', justifyContent: 'space-between', padding: '12px 20px', background: '#1f2937', color: 'white' };
  const linkStyle = { color: 'white', marginRight: 12, textDecoration: 'none' };

  return (
    <div style={navStyle}>
      <div style={{ fontWeight: 'bold' }}>RBAC</div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/home" style={linkStyle}>Home</Link>
        {user.role === 'admin' && <Link to="/admin" style={linkStyle}>Admin</Link>}
        {(user.role === 'editor' || user.role === 'admin') && <Link to="/editor" style={linkStyle}>Editor</Link>}
        <span style={{ marginLeft: 10 }}>{user.email} ({user.role})</span>
        <button onClick={logout} style={{ marginLeft: 12, padding: '6px 10px' }}>Logout</button>
      </div>
    </div>
  );
}
