"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipmentValidation = void 0;
const zod_1 = require("zod");
const createShipmentSchema = zod_1.z.object({
    body: zod_1.z.object({
        total_amount: zod_1.z.number({
            required_error: 'Total amount is required',
        }),
        order_id: zod_1.z.string({
            required_error: 'Order_id is required',
        }),
        shipment_status: zod_1.z.string({
            required_error: 'Shipment_status is required',
        }),
        shipment_code: zod_1.z.string({
            required_error: 'Shipment code is required',
        }),
        courier: zod_1.z.string({
            required_error: 'Courier Name is required',
        }),
        delivery_name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        buyer_id: zod_1.z.string({
            required_error: 'buyer_id is required',
        }),
    }),
});
const updateShipmentSchema = zod_1.z.object({
    body: zod_1.z.object({
        total_amount: zod_1.z.number().optional(),
        order_id: zod_1.z.string().optional(),
        shipment_status: zod_1.z.string().optional(),
        shipment_code: zod_1.z.string().optional(),
        courier: zod_1.z.string().optional(),
        delivery_name: zod_1.z.string().optional(),
        buyer_id: zod_1.z.string().optional(),
    }),
});
exports.ShipmentValidation = {
    createShipmentSchema,
    updateShipmentSchema,
};
