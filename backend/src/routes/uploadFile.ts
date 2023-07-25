import { uploadFile } from '@controllers/uploadFile';
import { Router } from 'express';

const router = Router();

router.route('/upload-file/:id').put(uploadFile);
router.route('/destroy-file').delete(uploadFile);

export default router;
