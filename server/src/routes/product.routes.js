import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  listProducts,
  updateProduct
} from '../controllers/product.controller.js';
import { authRequired } from '../middleware/auth.js';
import { allowRoles } from '../middleware/roles.js';

const router = Router();
router.get('/', listProducts);
router.post('/', authRequired, allowRoles('vendor', 'admin'), createProduct);
router.patch('/:id', authRequired, allowRoles('vendor', 'admin'), updateProduct);
router.delete('/:id', authRequired, allowRoles('vendor', 'admin'), deleteProduct);

export default router;
