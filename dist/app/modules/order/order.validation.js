"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidation = void 0;
const zod_1 = require("zod");
const order_constant_1 = require("./order.constant");
const productSchema = zod_1.z.object({
    product_id: zod_1.z.string({
        required_error: 'Product id is required',
    }),
    product_quantity: zod_1.z.number({
        required_error: 'Product quantity is required',
    }),
    product_name: zod_1.z
        .string({
        required_error: 'Product name is required',
    })
        .optional(),
    product_price: zod_1.z.number({
        required_error: 'price id is required',
    }),
});
const shipmentAddressSchema = zod_1.z.object({
    house_no: zod_1.z.string({
        required_error: 'House no is required',
    }),
    road_no: zod_1.z.string({
        required_error: 'Road no is required',
    }),
    area: zod_1.z.string().optional(),
    district: zod_1.z.string().optional(),
    country: zod_1.z.string({
        required_error: 'Country no is required',
    }),
});
const createOrderZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        order_product_list: zod_1.z.array(productSchema),
        amount: zod_1.z.number({
            required_error: 'Amount no is required',
        }),
        coupon_code: zod_1.z
            .string({
            required_error: 'coupon code is required',
        })
            .optional(),
        coupon_discount: zod_1.z
            .number({
            required_error: 'coupon discount is required',
        })
            .optional(),
        total_amount: zod_1.z.number({
            required_error: 'Total Amount is required',
        }),
        shipment_address: shipmentAddressSchema,
        delivery_email: zod_1.z.string().optional(),
    }),
});
const updateOrderZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        order_status: zod_1.z.enum([...order_constant_1.OrderStatus], {
            required_error: 'only pending/delivered/cancel is taking',
        }),
        delivery_email: zod_1.z.string().optional(),
    }),
});
exports.OrderValidation = {
    createOrderZodSchema,
    updateOrderZodSchema,
};
