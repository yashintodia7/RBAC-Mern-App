
import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Admin() {
  const [secret, setSecret] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/admin');
        setSecret(res.data.secret);
      } catch (err) {
        setSecret('Error loading admin data');
      }
    })();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2>Admin Dashboard</h2>
      <p>{secret}</p>
    </div>
  );
}
