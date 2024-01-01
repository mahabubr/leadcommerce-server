"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipmentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middleware/validateRequest");
const shipment_controller_1 = require("./shipment.controller");
const shipment_validation_1 = require("./shipment.validation");
const router = express_1.default.Router();
router.post('/create-shipment', validateRequest_1.requestValidation.validateRequest(shipment_validation_1.ShipmentValidation.createShipmentSchema), shipment_controller_1.ShipmentController.createShipment);
// update Shipment
router.patch('/:id', shipment_controller_1.ShipmentController.updateShipment);
// get single data from single Shipment
router.get('/:id', shipment_controller_1.ShipmentController.getSingleShipment);
// delete Shipment
router.delete('/:id', shipment_controller_1.ShipmentController.deleteShipment);
// search and filter and get multiple data
router.get('/', shipment_controller_1.ShipmentController.getAllShipment);
exports.ShipmentRoutes = router;
