import { nanoid } from 'nanoid';
import { db } from '../models/store.js';

export const createOrder = (req, res) => {
  const { items } = req.body;

  if (!Array.isArray(items) || !items.length) {
    return res.status(400).json({ message: 'Order items required' });
  }

  const detailedItems = items
    .map((item) => {
      const product = db.products.find((p) => p.id === item.productId);
      if (!product) return null;
      return {
        productId: product.id,
        name: product.name,
        quantity: Number(item.quantity || 1),
        price: product.price,
        vendorId: product.vendorId
      };
    })
    .filter(Boolean);

  const total = detailedItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const order = {
    id: nanoid(),
    userId: req.user.id,
    items: detailedItems,
    total,
    status: 'placed',
    createdAt: new Date().toISOString()
  };

  db.orders.push(order);
  res.status(201).json(order);
};

export const listOrders = (req, res) => {
  if (req.user.role === 'admin') {
    return res.json(db.orders);
  }

  if (req.user.role === 'vendor') {
    return res.json(
      db.orders.filter((order) => order.items.some((item) => item.vendorId === req.user.id))
    );
  }

  return res.json(db.orders.filter((order) => order.userId === req.user.id));
};
