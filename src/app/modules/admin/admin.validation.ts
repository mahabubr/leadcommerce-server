import { z } from 'zod';

const createAdminSchema = z.object({
  body: z.object({
    full_name: z.string({
      required_error: 'Name is required',
    }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email(),
    phone: z.string().optional(),
    address: z.string().optional(),
    image: z.string().url().optional(),
  }),
});

const updateAdminSchema = z.object({
  body: z.object({
    full_name: z.string(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    image: z.string().url().optional(),
  }),
});

export const AdminValidation = {
  createAdminSchema,
  updateAdminSchema,
};
