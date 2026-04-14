import { nanoid } from 'nanoid';
import { db } from '../models/store.js';

export const listConversations = (req, res) => {
  const conversations = db.chats.filter((c) => c.participants.includes(req.user.id));
  res.json(conversations);
};

export const createConversation = (req, res) => {
  const { participantIds = [], topic = 'Support Chat' } = req.body;

  const participants = [...new Set([req.user.id, ...participantIds])];
  if (participants.length < 2) {
    return res.status(400).json({ message: 'At least two participants required' });
  }

  const conversation = {
    id: nanoid(),
    topic,
    participants,
    messages: [],
    createdAt: new Date().toISOString()
  };

  db.chats.push(conversation);
  return res.status(201).json(conversation);
};

export const listMessages = (req, res) => {
  const conv = db.chats.find((c) => c.id === req.params.id);
  if (!conv) return res.status(404).json({ message: 'Conversation not found' });
  if (!conv.participants.includes(req.user.id)) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  return res.json(conv.messages);
};
