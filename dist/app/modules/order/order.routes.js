"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middleware/validateRequest");
const order_controller_1 = require("./order.controller");
const order_validation_1 = require("./order.validation");
const router = express_1.default.Router();
router.post('/', validateRequest_1.requestValidation.validateRequest(order_validation_1.OrderValidation.createOrderZodSchema), order_controller_1.OrdersController.createOrder);
router.get('/', order_controller_1.OrdersController.getAllOrders);
router.get('/:id', order_controller_1.OrdersController.getSingleOrder);
router.put('/:id', validateRequest_1.requestValidation.validateRequest(order_validation_1.OrderValidation.updateOrderZodSchema), order_controller_1.OrdersController.updateOrder);
router.patch('/update-status', order_controller_1.OrdersController.updateStatus);
router.delete('/:id', order_controller_1.OrdersController.deleteOrder);
exports.OrdersRoutes = router;
