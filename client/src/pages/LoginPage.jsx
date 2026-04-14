import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    nav('/');
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 340 }}>
      <h3>Login</h3>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
      <p>Demo: admin@shop.local / admin123</p>
      <p>Demo: vendor@shop.local / vendor123</p>
      <p>Demo: user@shop.local / user123</p>
    </form>
  );
}
