import express from 'express';
import { ENUM_ROLE } from '../../../enum/role';
import auth from '../../middleware/auth';
import { requestValidation } from '../../middleware/validateRequest';
import { EmployeController } from './employees.controller';
import { EmployeValidation } from './employees.validation';

const router = express.Router();

router.post(
  '/create-employe',
  auth(ENUM_ROLE.STORE),
  requestValidation.validateRequest(EmployeValidation.createEmployeSchema),
  EmployeController.createEmploye
);
// update Employe
router.patch(
  '/update',
  auth(ENUM_ROLE.EMPLOYEE),
  EmployeController.updateEmploye
);
// get single data from single Employe
router.get(
  '/single',
  auth(ENUM_ROLE.EMPLOYEE, ENUM_ROLE.STORE),
  EmployeController.getSingleEmploye
);
// delete Employe
router.delete(
  '/:id',
  auth(ENUM_ROLE.EMPLOYEE, ENUM_ROLE.STORE),
  EmployeController.deleteEmploye
);
// search and filter and get multiple data
router.get(
  '/',
  auth(ENUM_ROLE.EMPLOYEE, ENUM_ROLE.STORE, ENUM_ROLE.ADMIN),
  EmployeController.getAllEmploye
);

export const EmployeRoutes = router;
