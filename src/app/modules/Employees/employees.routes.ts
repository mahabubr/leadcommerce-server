import express from 'express';
import { requestValidation } from '../../middleware/validateRequest';
import { EmployeController } from './employees.controller';
import { EmployeValidation } from './employees.validation';

const router = express.Router();

router.post(
  '/create-employe',

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
