import { nanoid } from 'nanoid';
import { db } from '../models/store.js';

export const getCategories = (_req, res) => {
  res.json(db.categories);
};

export const createCategory = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Category name is required' });
  }

  const category = { id: nanoid(), name };
  db.categories.push(category);
  return res.status(201).json(category);
};
