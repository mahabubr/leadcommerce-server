import { z } from 'zod';

const createFaqSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
    description: z.string({
      required_error: 'description is required',
    }),
    user_id: z.string({
      required_error: 'Store_id is required',
    }),
    ans: z.string().optional(),
  }),
});

const updateFaqSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    descriptoin: z.string().optional(),
    user_id: z.string().optional(),
    ans: z.string().optional(),
  }),
});

export const faqValidation = {
  createFaqSchema,
  updateFaqSchema,
};
