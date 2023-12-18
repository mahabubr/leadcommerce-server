import express from 'express';
import { OrdersController } from './order.controller';

const router = express.Router();

router.post('/', OrdersController.createOrder);
router.get('/', OrdersController.getAllOrders);
router.get('/:id', OrdersController.getSingleOrder);
router.put('/:id', OrdersController.updateOrder);
router.delete('/:id', OrdersController.deleteOrder);

export const OrdersRoutes = router;
