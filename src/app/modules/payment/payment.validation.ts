import { z } from 'zod';

const createPaymentSchema = z.object({
  body: z.object({
    total_amount: z.number({
      required_error: 'total_amount is required',
    }),
    order_id: z.string({
      required_error: 'order_id is required',
    }),
    payment_status: z.string({
      required_error: 'payment_status is required',
    }),
    payment_code: z.string({
      required_error: 'payment_code is required',
    }),
    user_id: z.string({
      required_error: 'user_id is required',
    }),
    shop_id: z.string({
      required_error: 'shop_id is required',
    }),
  }),
});

const updatePaymentSchema = z.object({
  body: z.object({
    total_amount: z.number().optional(),
    order_id: z.string().optional(),
    payment_status: z.string().optional(),
    payment_code: z.string().optional(),
    user_id: z.string().optional(),
    shop_id: z.string().optional(),
  }),
});

export const PaymentValidation = {
  createPaymentSchema,
  updatePaymentSchema,
};
