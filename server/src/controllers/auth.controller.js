import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';
import { db } from '../models/store.js';
import { signToken } from '../utils/token.js';

export const register = async (req, res) => {
  const { name, email, password, role = 'user' } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (!['user', 'vendor'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  const existing = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ message: 'Email already registered' });
  }

  const user = {
    id: nanoid(),
    name,
    email,
    role,
    password: await bcrypt.hash(password, 10),
    online: false
  };

  db.users.push(user);
  const token = signToken({ id: user.id, role: user.role });
  return res.status(201).json({ token, user: { id: user.id, name, email, role } });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = signToken({ id: user.id, role: user.role });
  return res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role }
  });
};

export const me = (req, res) => {
  const { id, name, email, role } = req.user;
  return res.json({ id, name, email, role });
};
