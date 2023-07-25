import {
  createInformationApi,
  deleteInformationApi,
  getInformationApi,
  getInformationApis,
  updateInformationApi,
} from '@controllers/informationApi';
import { Router } from 'express';

const router = Router();

router.route('/information-api').get(getInformationApis).post(createInformationApi);
router.route('/information-api/:id').get(getInformationApi).put(updateInformationApi).delete(deleteInformationApi);

export default router;
