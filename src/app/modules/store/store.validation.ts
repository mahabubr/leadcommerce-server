import { z } from 'zod';

const createStoreSchema = z.object({
  body: z.object({
    logo: z.string().optional(),
    name: z.string({
      required_error: 'Name is required',
    }),
    owner_name: z.string().optional(),
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
    contact_no: z.string().optional(),
    location: z.string().optional(),
    total_orders: z.string().optional(),
    earning: z.number().optional(),
    refund: z.number().optional(),
  }),
});

const updateStoreSchema = z.object({
  body: z.object({
    logo: z.string().optional(),
    name: z.string().optional(),
    owner_name: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    contact_no: z.string().optional(),
    location: z.string().optional(),
    total_orders: z.string().optional(),
    earning: z.number().optional(),
    refund: z.number().optional(),
  }),
});

export const storeValidation = {
  createStoreSchema,
  updateStoreSchema,
};
