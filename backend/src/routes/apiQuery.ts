import { apiQuery } from '@controllers/apiQuery';
import { Router } from 'express';

const router = Router();

router.route('/api-query').post(apiQuery);

export default router;
