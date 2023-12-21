import { z } from 'zod';

const createEmployeSchema = z.object({
  body: z.object({
    full_name: z.string({
      required_error: 'Name is required',
    }),
    position: z.string({
      required_error: 'Position is required',
    }),
    shop_id: z.string({
      required_error: 'Store_id is required',
    }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email(),
    phone: z.string().optional(),
    image: z.string().url().optional(),
  }),
});

const updateEmployeSchema = z.object({
  body: z.object({
    full_name: z.string(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    position: z.string().optional(),
    address: z.string().optional(),
    image: z.string().url().optional(),
  }),
});

export const EmployeValidation = {
  createEmployeSchema,
  updateEmployeSchema,
};
