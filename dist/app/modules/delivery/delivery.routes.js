"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const delivery_controller_1 = require("./delivery.controller");
const multer_1 = __importDefault(require("../../middleware/multer"));
const router = express_1.default.Router();
router.post('/create-delivery', multer_1.default.single('image'), delivery_controller_1.DeliveryController.createDelivery);
router.put('/update', multer_1.default.single('image'), delivery_controller_1.DeliveryController.updateDelivery);
router.get('/single', delivery_controller_1.DeliveryController.getSingleDelivery);
router.delete('/:id', delivery_controller_1.DeliveryController.deleteDelivery);
router.get('/', delivery_controller_1.DeliveryController.getAllDelivery);
exports.DeliveryRoutes = router;
