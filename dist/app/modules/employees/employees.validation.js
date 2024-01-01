"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeValidation = void 0;
const zod_1 = require("zod");
const createEmployeSchema = zod_1.z.object({
    body: zod_1.z.object({
        full_name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        position: zod_1.z.string({
            required_error: 'Position is required',
        }),
        shop_id: zod_1.z.string({
            required_error: 'Store_id is required',
        }),
        email: zod_1.z
            .string({
            required_error: 'Email is required',
        })
            .email(),
        phone: zod_1.z.string().optional(),
        image: zod_1.z.string().url().optional(),
    }),
});
const updateEmployeSchema = zod_1.z.object({
    body: zod_1.z.object({
        full_name: zod_1.z.string(),
        email: zod_1.z.string().email().optional(),
        phone: zod_1.z.string().optional(),
        position: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        image: zod_1.z.string().url().optional(),
    }),
});
exports.EmployeValidation = {
    createEmployeSchema,
    updateEmployeSchema,
};
