import { createHotels, getHotel, getHotels } from '@controllers/hotel';
import { Router } from 'express';

const router = Router();

router.route('/hotel').get(getHotels).post(createHotels);
router.route('/hotel/:id').get(getHotel);

export default router;
