import express from 'express';
import multer from '../../middleware/multer';
import { requestValidation } from '../../middleware/validateRequest';
import { EmployeController } from './employe.controller';
import { EmployeValidation } from './employe.validation';

const router = express.Router();

router.post(
  '/create-employe',
  multer.single('image'),
  requestValidation.validateRequest(EmployeValidation.createEmployeSchema),
  EmployeController.createEmploye
);
// update Employe
router.put('/update', multer.single('image'), EmployeController.updateEmploye);
// get single data from single Employe
router.get(
  '/single',

  EmployeController.getSingleEmploye
);
// delete Employe
router.delete(
  '/:id',

  EmployeController.deleteEmploye
);
// search and filter and get multiple data
router.get(
  '/',

  EmployeController.getAllEmploye
);

export const EmployeRoutes = router;
