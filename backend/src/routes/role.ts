import { createRole, getRole, getRoles, updateRole } from '@controllers/role';
import schemeValidation from '@middlewares/schemeValidation';
import { RoleModel } from '@schemas/role';
import { Router } from 'express';

const router = Router();

router.route('/role/').get(getRoles).post(schemeValidation(RoleModel), createRole);
router.route('/role/:id').get(getRole).put(updateRole);

export default router;
