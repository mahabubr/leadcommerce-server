import { Schema, model } from 'mongoose';
import { OrderStatus, PaymentStatus, ShipmentStatus } from './order.constant';
import { IOrders, OrdersModel } from './order.interface';

const OrdersSchema = new Schema<IOrders, OrdersModel>({
  buyer_id: { type: Schema.Types.ObjectId, default: null },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'Route',
    required: true,
  },
  order_code: { type: String, required: true, unique: true },
  order_product_list: [
    {
      product_id: {
        type: Schema.Types.ObjectId,
        ref: 'Products',
        required: true,
      },
      product_quantity: { type: Number, required: true },
      product_price: { type: Number, required: true },
    },
  ],
  amount: { type: Number, required: true },
  order_status: {
    type: String,
    enum: OrderStatus,
    default: 'pending',
    required: true,
  },
  coupon_code: { type: String },
  coupon_discount: { type: Number, default: 0, required: true },
  total_amount: { type: Number, required: true },
  payment_id: { type: Schema.Types.ObjectId },
  payment_status: {
    type: String,
    enum: PaymentStatus,
    default: 'pending',
    required: true,
  },
  payment_date: { type: String },
  shipment_id: { type: Schema.Types.ObjectId },
  shipment_status: {
    type: String,
    default: 'pending',
    enum: ShipmentStatus,
    required: true,
  },
  shipment_date: { type: String },
});

export const Orders = model<IOrders, OrdersModel>('Orders', OrdersSchema);
