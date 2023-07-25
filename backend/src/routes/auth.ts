import { newAccessToken, signIn, signOut } from '@controllers/auth';
import { verifyAccessToken } from '@middlewares/verifyToken';
import { Router } from 'express';

const router = Router();

router.route('/signin').post(signIn);
router.route('/signout/:id').get(verifyAccessToken, signOut);
router.route('/refresh-token/:id').get(newAccessToken);

export default router;
