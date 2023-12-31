import express from 'express';
import { DeliveryController } from './delivery.controller';

const router = express.Router();

router.post('/create-delivery', DeliveryController.createDelivery);

router.patch('/update', DeliveryController.updateDelivery);

router.get('/single', DeliveryController.getSingleDelivery);

router.delete('/:id', DeliveryController.deleteDelivery);

router.get('/', DeliveryController.getAllDelivery);

export const DeliveryRoutes = router;
