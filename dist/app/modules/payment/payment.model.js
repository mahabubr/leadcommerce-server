"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const order_constant_1 = require("../order/order.constant");
const PaymentSchema = new mongoose_1.Schema({
    total_amount: { type: Number, required: true },
    order_id: { type: mongoose_1.Types.ObjectId, ref: 'Orders' },
    payment_status: {
        type: String,
        enum: order_constant_1.PaymentStatus,
        required: true,
    },
    description: { type: String, default: '' },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
const Payment = (0, mongoose_1.model)('Payment', PaymentSchema);
exports.default = Payment;
