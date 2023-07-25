import {
  createPromotion,
  getPromotionById,
  getPromotions,
  getPromotionsByMembership,
  getPromotionsSeller,
  updatePromotion,
} from '@controllers/promotion';
import { Router } from 'express';

const router = Router();

router.route('/promotion').get(getPromotions).post(createPromotion);
router.route('/promotions/seller').get(getPromotionsSeller);
router.route('/promotions/admin').get(getPromotions);
router.route('/promotions/client').get(getPromotionsByMembership);
router.route('/promotion/:id').get(getPromotionById).put(updatePromotion);

export default router;
