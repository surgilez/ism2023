import { getMessages } from '@controllers/message';
import { Router } from 'express';

const router = Router();

router.route('/chat/messages/:from').get(getMessages);

export default router;
