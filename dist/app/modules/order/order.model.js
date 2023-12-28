"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
const mongoose_1 = require("mongoose");
const order_constant_1 = require("./order.constant");
const ShipmentAddressSchema = new mongoose_1.Schema({
    house_no: { type: String },
    road_no: { type: String },
    area: { type: String },
    district: { type: String },
    country: { type: String },
});
const OrdersSchema = new mongoose_1.Schema({
    buyer_id: { type: mongoose_1.Schema.Types.ObjectId, default: null },
    store_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Store', // TODO: change to the vendor user_id
        // required: true,
    },
    order_code: { type: String, required: true, unique: true },
    order_product_list: [
        {
            product_id: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Products',
                required: true,
            },
            product_quantity: { type: Number, required: true },
            product_price: { type: Number, required: true },
        },
    ],
    total_items: { type: Number },
    total_quantity: { type: Number },
    amount: { type: Number, required: true },
    order_status: {
        type: String,
        enum: order_constant_1.OrderStatus,
        default: 'pending',
        required: true,
    },
    coupon_code: { type: String },
    coupon_discount: { type: Number, default: 0 },
    total_amount: { type: Number, required: true },
    payment_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        // ref: 'Payments',  // TODO: change to the Payments table schema
    },
    payment_status: {
        type: String,
        enum: order_constant_1.PaymentStatus,
        default: 'pending',
        required: true,
    },
    payment_date: { type: String },
    shipment_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        // ref: 'Shipments',  // TODO: change to the Shipments table schema
    },
    shipment_status: {
        type: String,
        default: 'pending',
        enum: order_constant_1.ShipmentStatus,
        required: true,
    },
    shipment_address: { type: ShipmentAddressSchema },
    shipment_date: { type: String },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Orders = (0, mongoose_1.model)('Orders', OrdersSchema);
