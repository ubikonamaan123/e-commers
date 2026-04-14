import { db } from '../models/store.js';
import { verifyToken } from '../utils/token.js';

export const mountSocket = (io) => {
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) {
      return next(new Error('Unauthorized'));
    }

    try {
      const payload = verifyToken(token);
      const user = db.users.find((u) => u.id === payload.id);
      if (!user) return next(new Error('User not found'));
      socket.user = user;
      user.online = true;
      return next();
    } catch {
      return next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    socket.join(socket.user.id);

    socket.on('chat:join', (conversationId) => {
      const conv = db.chats.find((c) => c.id === conversationId);
      if (conv && conv.participants.includes(socket.user.id)) {
        socket.join(conversationId);
      }
    });

    socket.on('chat:send', ({ conversationId, text }) => {
      const conv = db.chats.find((c) => c.id === conversationId);
      if (!conv || !conv.participants.includes(socket.user.id)) return;

      const message = {
        id: `${Date.now()}-${Math.random()}`,
        senderId: socket.user.id,
        text,
        createdAt: new Date().toISOString()
      };

      conv.messages.push(message);
      io.to(conversationId).emit('chat:message', { conversationId, message });
    });

    socket.on('disconnect', () => {
      socket.user.online = false;
    });
  });
};
