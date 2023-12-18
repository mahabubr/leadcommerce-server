import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { CustomerController } from './customer.controller';
import { CustomerValidaion } from './customer.validation';

const router = express.Router();

router.get('/:id', CustomerController.getSingleCustomer);
router.get('/', CustomerController.getAllCustomers);
router.delete('/:id', CustomerController.deleteCustomer);

router.patch(
  '/:id',
  validateRequest(CustomerValidaion.updateCustomerZodSchema),
  CustomerController.updateCustomer
);

export const CustomerRoutes = router;
