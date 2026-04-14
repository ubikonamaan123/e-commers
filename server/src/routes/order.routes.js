import { Router } from 'express';
import { createOrder, listOrders } from '../controllers/order.controller.js';
import { authRequired } from '../middleware/auth.js';

const router = Router();
router.get('/', authRequired, listOrders);
router.post('/', authRequired, createOrder);

export default router;
