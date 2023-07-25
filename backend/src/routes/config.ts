import { createConfig, getConfig } from '@controllers/config';
import schemeValidation from '@middlewares/schemeValidation';
import { ConfigModel } from '@schemas/config';
import { Router } from 'express';

const router = Router();

router.route('/config').post(schemeValidation(ConfigModel), createConfig).get(getConfig);

export default router;
