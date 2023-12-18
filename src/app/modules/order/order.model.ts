import { Schema, model } from 'mongoose';
import { OrderStatus, PaymentStatus, ShipmentStatus } from './order.constant';
import { IOrders, OrdersModel } from './order.interface';

const ShipmentAddressSchema = new Schema({
  house_no: { type: String },
  road_no: { type: String },
  area: { type: String },
  district: { type: String },
  country: { type: String },
});

const OrdersSchema = new Schema<IOrders, OrdersModel>(
  {
    buyer_id: { type: Schema.Types.ObjectId, default: null },
    user_id: {
      type: Schema.Types.ObjectId,
      // ref: 'user_id',  // TODO: change to the vendor user_id
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
    total_items: { type: Number },
    total_quantity: { type: Number },
    amount: { type: Number, required: true },
    order_status: {
      type: String,
      enum: OrderStatus,
      default: 'pending',
      required: true,
    },
    coupon_code: { type: String },
    coupon_discount: { type: Number, default: 0 },
    total_amount: { type: Number, required: true },
    payment_id: {
      type: Schema.Types.ObjectId,
      // ref: 'Payments',  // TODO: change to the Payments table schema
    },
    payment_status: {
      type: String,
      enum: PaymentStatus,
      default: 'pending',
      required: true,
    },
    payment_date: { type: String },
    shipment_id: {
      type: Schema.Types.ObjectId,
      // ref: 'Shipments',  // TODO: change to the Shipments table schema
    },
    shipment_status: {
      type: String,
      default: 'pending',
      enum: ShipmentStatus,
      required: true,
    },
    shipment_address: { type: ShipmentAddressSchema },
    shipment_date: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Orders = model<IOrders, OrdersModel>('Orders', OrdersSchema);
