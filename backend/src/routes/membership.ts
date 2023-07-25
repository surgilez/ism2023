import {
  createMembership,
  getMembership,
  getMemberships,
  getMembershipsByAccountId,
  updateMembership,
  updateMembershipState,
} from '@controllers/membership';
import { Router } from 'express';

const router = Router();

router.route('/membership').get(getMemberships).post(createMembership).put(updateMembershipState);
router.route('/membership/:id').get(getMembership).put(updateMembership);
router.route('/membership/account/:id').get(getMembershipsByAccountId);

export default router;
