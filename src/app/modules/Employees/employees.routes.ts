import express from 'express';
import { EmployeController } from './Employees.controller';
import multer from '../../middleware/multer';
import { requestValidation } from '../../middleware/validateRequest';
import { EmployeValidation } from './employees.validation';

const router = express.Router();

router.post(
  '/create-employe',
  multer.single('image'),
  requestValidation.validateRequest(EmployeValidation.createEmployeSchema),
  EmployeController.createEmploye
);
// update Employe
router.patch(
  '/update',

  EmployeController.updateEmploye
);
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
