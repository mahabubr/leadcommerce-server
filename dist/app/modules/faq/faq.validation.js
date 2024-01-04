"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.faqValidation = void 0;
const zod_1 = require("zod");
const createFaqSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'title is required',
        }),
        description: zod_1.z.string({
            required_error: 'description is required',
        }),
        user_id: zod_1.z.string({
            required_error: 'Store_id is required',
        }),
        ans: zod_1.z.string().optional(),
    }),
});
const updateFaqSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        descriptoin: zod_1.z.string().optional(),
        user_id: zod_1.z.string().optional(),
        ans: zod_1.z.string().optional(),
    }),
});
exports.faqValidation = {
    createFaqSchema,
    updateFaqSchema,
};
