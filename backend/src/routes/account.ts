import {
  createAccount,
  getAccount,
  getAccounts,
  getAccountsAdmin,
  getAccountsBySeller,
  getAccountsChat,
  resetPassword,
  updateAccount,
  updateAccountState,
} from '@controllers/account';
import { verifyAccessToken, verifyAccessTokenPassword } from '@middlewares/verifyToken';
import { Router } from 'express';

const router = Router();

router.route('/account').all(verifyAccessToken).get(getAccounts).post(createAccount).put(updateAccountState);
router.route('/account/seller/:id').all(verifyAccessToken).get(getAccountsBySeller);
router.route('/accounts').all(verifyAccessToken).get(getAccountsChat).post(getAccountsAdmin);
router.route('/account/reset-password').put(verifyAccessTokenPassword, resetPassword);
router.route('/account/:id').all(verifyAccessToken).get(getAccount).put(updateAccount);

export default router;
