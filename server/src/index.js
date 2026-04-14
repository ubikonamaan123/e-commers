import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { env } from './config/env.js';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import categoryRoutes from './routes/category.routes.js';
import orderRoutes from './routes/order.routes.js';
import chatRoutes from './routes/chat.routes.js';
import { seedVendorAndUser } from './models/store.js';
import { mountSocket } from './socket/index.js';

seedVendorAndUser();

const app = express();
app.use(cors({ origin: env.clientUrl }));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/chats', chatRoutes);

const server = createServer(app);
const io = new Server(server, {
  cors: { origin: env.clientUrl }
});
mountSocket(io);

server.listen(env.port, () => {
  console.log(`Server running on http://localhost:${env.port}`);
});
