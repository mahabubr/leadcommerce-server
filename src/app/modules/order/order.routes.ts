import express from 'express';
import { requestValidation } from '../../middleware/validateRequest';
import { OrdersController } from './order.controller';
import { OrderValidation } from './order.validation';

const router = express.Router();

router.post(
  '/',
  requestValidation.validateRequest(OrderValidation.createOrderZodSchema),
  OrdersController.createOrder
);
router.get('/', OrdersController.getAllOrders);
router.get('/:id', OrdersController.getSingleOrder);
router.put(
  '/:id',
  requestValidation.validateRequest(OrderValidation.updateOrderZodSchema),
  OrdersController.updateOrder
);
router.delete('/:id', OrdersController.deleteOrder);

export const OrdersRoutes = router;
