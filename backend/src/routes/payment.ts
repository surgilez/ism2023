import { checkOutId, getVoucher, paymentStatus } from '@controllers/payment';
import { verifyAccessToken } from '@middlewares/verifyToken';
import { Router } from 'express';

const router = Router();

router.route('/payment/voucher/:id/voucher.pdf').get(getVoucher);
router.route('/payment').post(verifyAccessToken, checkOutId);
router.route('/payment/:id').get(verifyAccessToken, paymentStatus);

export default router;
