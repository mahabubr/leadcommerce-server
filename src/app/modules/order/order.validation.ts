import { z } from 'zod';
import { OrderStatus } from './order.constant';

const productSchema = z.object({
  product_id: z.string({
    required_error: 'Product id is required',
  }),
  product_quantity: z.number({
    required_error: 'Product quantity is required',
  }),
  product_name: z
    .string({
      required_error: 'Product name is required',
    })
    .optional(),
  product_price: z.number({
    required_error: 'price id is required',
  }),
});

const shipmentAddressSchema = z.object({
  house_no: z.string({
    required_error: 'House no is required',
  }),
  road_no: z.string({
    required_error: 'Road no is required',
  }),
  area: z.string().optional(),
  district: z.string().optional(),
  country: z.string({
    required_error: 'Country no is required',
  }),
});

const createOrderZodSchema = z.object({
  body: z.object({
    order_product_list: z.array(productSchema),
    amount: z.number({
      required_error: 'Amount no is required',
    }),
    coupon_code: z
      .string({
        required_error: 'coupon code is required',
      })
      .optional(),
    coupon_discount: z
      .number({
        required_error: 'coupon discount is required',
      })
      .optional(),
    total_amount: z.number({
      required_error: 'Total Amount is required',
    }),
    shipment_address: shipmentAddressSchema,
    delivery_email: z.string().optional(),
  }),
});

const updateOrderZodSchema = z.object({
  body: z.object({
    order_status: z.enum([...OrderStatus] as [string, ...string[]], {
      required_error: 'only pending/delivered/cancel is taking',
    }),
    delivery_email: z.string().optional(),
  }),
});

export const OrderValidation = {
  createOrderZodSchema,
  updateOrderZodSchema,
};
