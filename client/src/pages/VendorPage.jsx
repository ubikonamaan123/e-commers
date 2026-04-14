import { useEffect, useState } from 'react';
import { http } from '../api/http';
import { useAuth } from '../context/AuthContext';

export default function VendorPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', categoryId: '', price: '', stock: '' });

  const load = async () => {
    const [p, c] = await Promise.all([
      http.get('/products', { params: { vendorId: user.id } }),
      http.get('/categories')
    ]);
    setProducts(p.data);
    setCategories(c.data);
  };

  useEffect(() => {
    if (user?.id) load();
  }, [user?.id]);

  const create = async () => {
    await http.post('/products', form);
    setForm({ name: '', description: '', categoryId: '', price: '', stock: '' });
    load();
  };

  return (
    <section>
      <h3>Vendor Panel</h3>
      <div style={{ display: 'grid', gap: 8, maxWidth: 400 }}>
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
          <option value="">Select category</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <input placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <input placeholder="Stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
        <button onClick={create}>Add Product</button>
      </div>
      <h4>Your Products</h4>
      <ul>
        {products.map((p) => <li key={p.id}>{p.name} - ₹{p.price}</li>)}
      </ul>
    </section>
  );
}
