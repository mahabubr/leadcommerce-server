"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderFilterableFields = exports.OrderSearchableFields = exports.ShipmentStatus = exports.PaymentStatus = exports.OrderStatus = void 0;
exports.OrderStatus = [
    'pending',
    'delivered',
    'cancel',
    'paused',
    'accept',
];
exports.PaymentStatus = [
    'pending',
    'completed',
    'canceled',
];
exports.ShipmentStatus = [
    'pending',
    'completed',
    'canceled',
    'paused',
];
exports.OrderSearchableFields = [
    'payment_status',
    'shipment_status',
    'order_status',
    'order_code',
];
exports.OrderFilterableFields = [
    'searchTerm',
    'order_code',
    'order_status',
    'total_items',
    'total_quantity',
    'total_amount',
];
