import express from 'express';
import multer from '../../middleware/multer';
import { requestValidation } from '../../middleware/validateRequest';
import { AdminController } from './admin.controller';
import { AdminValidation } from './admin.validation';

const router = express.Router();

router.post(
  '/create-admin',
  multer.single('image'),
  requestValidation.validateRequest(AdminValidation.createAdminSchema),
  AdminController.createAdmin
);
// get single data from single Employe
router.get('/single', AdminController.getSingleAdminWithtoken);
// update Admin
router.put('/update', multer.single('image'), AdminController.updateAdmin);
// get single data from single Admin
router.get('/:id', AdminController.getSingleAdmin);
// delete Admin
router.delete('/:id', AdminController.deleteAdmin);
// search and filter and get multiple data
router.get('/', AdminController.getAllAdmin);

export const AdminRoutes = router;
