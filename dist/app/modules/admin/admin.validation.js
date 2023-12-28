"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidation = void 0;
const zod_1 = require("zod");
const createAdminSchema = zod_1.z.object({
    body: zod_1.z.object({
        full_name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        email: zod_1.z
            .string({
            required_error: 'Email is required',
        })
            .email(),
        phone: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        image: zod_1.z.string().url().optional(),
    }),
});
const updateAdminSchema = zod_1.z.object({
    body: zod_1.z.object({
        full_name: zod_1.z.string(),
        email: zod_1.z.string().email().optional(),
        phone: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        image: zod_1.z.string().url().optional(),
    }),
});
exports.AdminValidation = {
    createAdminSchema,
    updateAdminSchema,
};
