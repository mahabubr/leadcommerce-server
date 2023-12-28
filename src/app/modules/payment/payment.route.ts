import express from 'express';
import { requestValidation } from '../../middleware/validateRequest';
import { PaymentController } from './payment.controller';
import { PaymentValidation } from './payment.validation';

const router = express.Router();

router.post(
  '/create-payment',
  requestValidation.validateRequest(PaymentValidation.createPaymentSchema),
  PaymentController.createPayment
);
// update Payment
router.patch('/:id', PaymentController.updatePayment);
// get single data from single Payment
router.get('/:id', PaymentController.getSinglePayment);
// delete Payment
router.delete('/:id', PaymentController.deletePayment);
// search and filter and get multiple data
router.get('/', PaymentController.getAllPayment);

export const PaymentRoutes = router;
