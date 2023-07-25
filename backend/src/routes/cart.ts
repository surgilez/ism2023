import { createCart, deleteCart, getCart, updateCart } from '@controllers/cart';
import { Router } from 'express';

const router = Router();

router.route('/cart').post(createCart);
router.route('/cart/:id').get(getCart).put(updateCart).delete(deleteCart);

export default router;
