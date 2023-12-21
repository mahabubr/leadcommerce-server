import { z } from 'zod';

const createShipmentSchema = z.object({
  body: z.object({
    total_amount: z.number({
      required_error: 'Total amount is required',
    }),
    order_id: z.string({
      required_error: 'Order_id is required',
    }),
    shipment_status: z.string({
      required_error: 'Shipment_status is required',
    }),
    shipment_code: z.string({
      required_error: 'Shipment code is required',
    }),
    courier: z.string({
      required_error: 'Courier Name is required',
    }),
    delivery_name: z.string({
      required_error: 'Name is required',
    }),
    buyer_id: z.string({
      required_error: 'buyer_id is required',
    }),
  }),
});

const updateShipmentSchema = z.object({
  body: z.object({
    total_amount: z.number().optional(),
    order_id: z.string().optional(),
    shipment_status: z.string().optional(),
    shipment_code: z.string().optional(),
    courier: z.string().optional(),
    delivery_name: z.string().optional(),
    buyer_id: z.string().optional(),
  }),
});

export const ShipmentValidation = {
  createShipmentSchema,
  updateShipmentSchema,
};
