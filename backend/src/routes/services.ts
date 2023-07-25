import { getServices } from '@controllers/services';

import { Router } from 'express';

const router = Router();

router.route('/services').get(getServices);

export default router;
