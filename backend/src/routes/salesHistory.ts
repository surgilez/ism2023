import {
  createSalesHistory,
  getSalesHistories,
  getSalesHistoriesAll,
  getSalesHistoryById,
  getSalesHistoryByIdSeller,
  getSalesHistoryByIdSellerAndDate,
} from '@controllers/salesHistory';
import { Router } from 'express';

const router = Router();

router.route('/sales-history').get(getSalesHistoriesAll).post(createSalesHistory);
router.route('/sales-histories').post(getSalesHistories);
router.route('/sales-history/seller/:id').post(getSalesHistoryByIdSeller);
router.route('/sales-history/seller/date/:id').get(getSalesHistoryByIdSellerAndDate);
router.route('/sales-history/:id').get(getSalesHistoryById);

export default router;
