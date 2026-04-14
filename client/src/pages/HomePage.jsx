import { useEffect, useMemo, useState } from 'react';
import { http } from '../api/http';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../context/AuthContext';

export default function HomePage() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [cart, setCart] = useState([]);

  const load = async () => {
    const [p, c] = await Promise.all([
      http.get('/products', { params: { q: query, category } }),
      http.get('/categories')
    ]);
    setProducts(p.data);
    setCategories(c.data);
  };

  useEffect(() => {
    load();
  }, []);

  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((p) => p.productId === product.id);
      if (found) {
        return prev.map((p) =>
          p.productId === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { productId: product.id, quantity: 1, name: product.name }];
    });
  };

  const totalItems = useMemo(() => cart.reduce((sum, i) => sum + i.quantity, 0), [cart]);

  const placeOrder = async () => {
    if (!user) return alert('Login first');
    await http.post('/orders', { items: cart });
    alert('Order placed successfully');
    setCart([]);
  };

  return (
    <main>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products" />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <button onClick={load}>Filter</button>
      </div>
      <p>Cart Items: {totalItems}</p>
      <button disabled={!cart.length} onClick={placeOrder}>Checkout</button>
      <section
        style={{
          marginTop: 12,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 12
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={addToCart} />
        ))}
      </section>
    </main>
  );
}
