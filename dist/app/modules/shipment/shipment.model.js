"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const order_constant_1 = require("../order/order.constant");
const ShipmentSchema = new mongoose_1.Schema({
    total_amount: { type: Number, required: true },
    order_id: { type: mongoose_1.Types.ObjectId, required: true },
    shipment_status: {
        type: String,
        enum: order_constant_1.ShipmentStatus,
        required: true,
    },
    shipment_code: {
        type: String,
        required: true,
    },
    courier: {
        type: String,
        required: true,
    },
    delivery_name: {
        type: String,
        required: true,
    },
    buyer_id: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
const Shipment = (0, mongoose_1.model)('Shipment', ShipmentSchema);
exports.default = Shipment;
