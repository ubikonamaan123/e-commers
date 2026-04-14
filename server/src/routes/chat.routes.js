import { Router } from 'express';
import {
  createConversation,
  listConversations,
  listMessages
} from '../controllers/chat.controller.js';
import { authRequired } from '../middleware/auth.js';

const router = Router();
router.get('/', authRequired, listConversations);
router.post('/', authRequired, createConversation);
router.get('/:id/messages', authRequired, listMessages);

export default router;
