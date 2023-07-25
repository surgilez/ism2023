import { sendEmailContact, sendEmailPassword, sendEmailAccount } from '@controllers/sendEmail';
import { Router } from 'express';

const router = Router();

router.route('/send/password').post(sendEmailPassword);
router.route('/send/contact').post(sendEmailContact);
router.route('/send/account').post(sendEmailAccount);

export default router;
