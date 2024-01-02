import express from 'express';
import { ENUM_ROLE } from '../../../enum/role';
import auth from '../../middleware/auth';
import { requestValidation } from '../../middleware/validateRequest';
import { OrdersController } from './order.controller';
import { OrderValidation } from './order.validation';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_ROLE.EMPLOYEE),
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
router.patch('/update-status', OrdersController.updateStatus);
router.delete('/:id', OrdersController.deleteOrder);

export const OrdersRoutes = router;
