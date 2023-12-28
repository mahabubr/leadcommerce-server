import express from 'express';
import { requestValidation } from '../../middleware/validateRequest';
import { ShipmentController } from './shipment.controller';
import { ShipmentValidation } from './shipment.validation';

const router = express.Router();

router.post(
  '/create-shipment',
  requestValidation.validateRequest(ShipmentValidation.createShipmentSchema),
  ShipmentController.createShipment
);
// update Shipment
router.patch('/:id', ShipmentController.updateShipment);
// get single data from single Shipment
router.get('/:id', ShipmentController.getSingleShipment);
// delete Shipment
router.delete('/:id', ShipmentController.deleteShipment);
// search and filter and get multiple data
router.get('/', ShipmentController.getAllShipment);

export const ShipmentRoutes = router;
