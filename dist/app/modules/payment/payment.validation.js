"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentValidation = void 0;
const zod_1 = require("zod");
const createPaymentSchema = zod_1.z.object({
    body: zod_1.z.object({
        total_amount: zod_1.z.number({
            required_error: 'total_amount is required',
        }),
        order_id: zod_1.z.string({
            required_error: 'order_id is required',
        }),
        payment_status: zod_1.z.string({
            required_error: 'payment_status is required',
        }),
        payment_code: zod_1.z.string({
            required_error: 'payment_code is required',
        }),
        user_id: zod_1.z.string({
            required_error: 'user_id is required',
        }),
        shop_id: zod_1.z.string({
            required_error: 'shop_id is required',
        }),
    }),
});
const updatePaymentSchema = zod_1.z.object({
    body: zod_1.z.object({
        total_amount: zod_1.z.number().optional(),
        order_id: zod_1.z.string().optional(),
        payment_status: zod_1.z.string().optional(),
        payment_code: zod_1.z.string().optional(),
        user_id: zod_1.z.string().optional(),
        shop_id: zod_1.z.string().optional(),
    }),
});
exports.PaymentValidation = {
    createPaymentSchema,
    updatePaymentSchema,
};
