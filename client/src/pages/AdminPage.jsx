import { useEffect, useState } from 'react';
import { http } from '../api/http';

export default function AdminPage() {
  const [orders, setOrders] = useState([]);
  const [category, setCategory] = useState('');

  const load = async () => {
    const o = await http.get('/orders');
    setOrders(o.data);
  };

  useEffect(() => {
    load();
  }, []);

  const addCategory = async () => {
    if (!category) return;
    await http.post('/categories', { name: category });
    alert('Category added');
    setCategory('');
  };

  return (
    <section>
      <h3>Admin Panel</h3>
      <div>
        <input value={category} placeholder="New category" onChange={(e) => setCategory(e.target.value)} />
        <button onClick={addCategory}>Create Category</button>
      </div>
      <h4>All Orders</h4>
      <ul>
        {orders.map((o) => (
          <li key={o.id}>Order {o.id} - ₹{o.total} - {o.status}</li>
        ))}
      </ul>
    </section>
  );
}
