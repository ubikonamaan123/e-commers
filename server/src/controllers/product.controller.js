import { nanoid } from 'nanoid';
import { db } from '../models/store.js';

export const listProducts = (req, res) => {
  const { q = '', category = '', vendorId = '' } = req.query;
  let data = [...db.products];

  if (q) {
    const query = q.toLowerCase();
    data = data.filter(
      (p) => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)
    );
  }

  if (category) {
    data = data.filter((p) => p.categoryId === category);
  }

  if (vendorId) {
    data = data.filter((p) => p.vendorId === vendorId);
  }

  res.json(data);
};

export const createProduct = (req, res) => {
  const { name, description, categoryId, price, stock = 0, image } = req.body;

  if (!name || !categoryId || !price) {
    return res.status(400).json({ message: 'name, categoryId and price are required' });
  }

  const product = {
    id: nanoid(),
    name,
    description: description || '',
    categoryId,
    price: Number(price),
    stock: Number(stock),
    image: image || 'https://placehold.co/300x200?text=Product',
    vendorId: req.user.id,
    createdAt: new Date().toISOString()
  };

  db.products.push(product);
  return res.status(201).json(product);
};

export const updateProduct = (req, res) => {
  const product = db.products.find((p) => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  if (req.user.role === 'vendor' && product.vendorId !== req.user.id) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  Object.assign(product, req.body);
  return res.json(product);
};

export const deleteProduct = (req, res) => {
  const index = db.products.findIndex((p) => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const product = db.products[index];
  if (req.user.role === 'vendor' && product.vendorId !== req.user.id) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  db.products.splice(index, 1);
  return res.json({ message: 'Deleted' });
};
