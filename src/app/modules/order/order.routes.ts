import express from 'express';
import { OrdersController } from './order.controller';

const router = express.Router();

router.post('/', OrdersController.createOrder);
router.get('/', OrdersController.getAllOrders);

export const OrdersRoutes = router;
