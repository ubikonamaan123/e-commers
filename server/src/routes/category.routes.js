import { Router } from 'express';
import { createCategory, getCategories } from '../controllers/category.controller.js';
import { authRequired } from '../middleware/auth.js';
import { allowRoles } from '../middleware/roles.js';

const router = Router();
router.get('/', getCategories);
router.post('/', authRequired, allowRoles('admin'), createCategory);

export default router;
