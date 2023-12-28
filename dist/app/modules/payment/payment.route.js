"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middleware/validateRequest");
const payment_controller_1 = require("./payment.controller");
const payment_validation_1 = require("./payment.validation");
const router = express_1.default.Router();
router.post('/create-payment', validateRequest_1.requestValidation.validateRequest(payment_validation_1.PaymentValidation.createPaymentSchema), payment_controller_1.PaymentController.createPayment);
// update Payment
router.patch('/:id', payment_controller_1.PaymentController.updatePayment);
// get single data from single Payment
router.get('/:id', payment_controller_1.PaymentController.getSinglePayment);
// delete Payment
router.delete('/:id', payment_controller_1.PaymentController.deletePayment);
// search and filter and get multiple data
router.get('/', payment_controller_1.PaymentController.getAllPayment);
exports.PaymentRoutes = router;
