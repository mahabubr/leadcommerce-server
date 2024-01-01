import express from 'express';
import { requestValidation } from '../../middleware/validateRequest';
import { AdminController } from './admin.controller';
import { AdminValidation } from './admin.validation';

const router = express.Router();

router.post(
  '/create-admin',
  requestValidation.validateRequest(AdminValidation.createAdminSchema),
  AdminController.createAdmin
);
// update Admin
router.patch('/:id', AdminController.updateAdmin);
// get single data from single Admin
router.get('/:id', AdminController.getSingleAdmin);
// delete Admin
router.delete('/:id', AdminController.deleteAdmin);
// search and filter and get multiple data
router.get('/', AdminController.getAllAdmin);

export const AdminRoutes = router;
