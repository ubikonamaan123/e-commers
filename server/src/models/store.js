import { nanoid } from 'nanoid';
import bcrypt from 'bcryptjs';

const passwordHash = bcrypt.hashSync('admin123', 10);

export const db = {
  users: [
    {
      id: nanoid(),
      name: 'Super Admin',
      email: 'admin@shop.local',
      role: 'admin',
      password: passwordHash,
      online: false
    }
  ],
  categories: [
    { id: nanoid(), name: 'Electronics' },
    { id: nanoid(), name: 'Fashion' },
    { id: nanoid(), name: 'Home' }
  ],
  products: [],
  chats: [],
  orders: []
};

export const seedVendorAndUser = () => {
  const vendorExists = db.users.find((u) => u.email === 'vendor@shop.local');
  const userExists = db.users.find((u) => u.email === 'user@shop.local');

  if (!vendorExists) {
    db.users.push({
      id: nanoid(),
      name: 'Demo Vendor',
      email: 'vendor@shop.local',
      role: 'vendor',
      password: bcrypt.hashSync('vendor123', 10),
      online: false
    });
  }

  if (!userExists) {
    db.users.push({
      id: nanoid(),
      name: 'Demo User',
      email: 'user@shop.local',
      role: 'user',
      password: bcrypt.hashSync('user123', 10),
      online: false
    });
  }
};
