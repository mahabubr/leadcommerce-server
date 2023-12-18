import express from 'express';
import { OrdersController } from './order.controller';

const router = express.Router();

router.post('/', OrdersController.createOrder);
router.get('/', OrdersController.getAllOrders);
router.get('/:id', OrdersController.getSingleOrder);

export const OrdersRoutes = router;
