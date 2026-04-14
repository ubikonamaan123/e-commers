import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(form);
    nav('/');
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 340 }}>
      <h3>Register</h3>
      <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <select onChange={(e) => setForm({ ...form, role: e.target.value })}>
        <option value="user">User</option>
        <option value="vendor">Vendor</option>
      </select>
      <button type="submit">Create Account</button>
    </form>
  );
}
