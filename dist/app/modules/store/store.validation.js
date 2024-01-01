"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeValidation = void 0;
const zod_1 = require("zod");
const createStoreSchema = zod_1.z.object({
    body: zod_1.z.object({
        logo: zod_1.z.string().optional(),
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        owner_name: zod_1.z.string().optional(),
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
        contact_no: zod_1.z.string().optional(),
        location: zod_1.z.string().optional(),
        total_orders: zod_1.z.string().optional(),
        earning: zod_1.z.number().optional(),
        refund: zod_1.z.number().optional(),
    }),
});
const updateStoreSchema = zod_1.z.object({
    body: zod_1.z.object({
        logo: zod_1.z.string().optional(),
        name: zod_1.z.string().optional(),
        owner_name: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        password: zod_1.z.string().optional(),
        contact_no: zod_1.z.string().optional(),
        location: zod_1.z.string().optional(),
        total_orders: zod_1.z.string().optional(),
        earning: zod_1.z.number().optional(),
        refund: zod_1.z.number().optional(),
    }),
});
exports.storeValidation = {
    createStoreSchema,
    updateStoreSchema,
};
