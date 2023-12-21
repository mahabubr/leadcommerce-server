import { Schema, Types, model } from 'mongoose';
import { PaymentStatus } from '../order/order.constant';
import { IPayment, PaymentModel } from './payment.interface';

const PaymentSchema = new Schema<IPayment>(
  {
    total_amount: { type: Number, required: true },
    order_id: { type: Types.ObjectId, required: true },
    payment_status: {
      type: String,
      enum: PaymentStatus,
      required: true,
    },
    payment_code: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    shop_id: {
      type: Types.ObjectId,
      ref: 'Store',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Payment = model<IPayment, PaymentModel>('Payment', PaymentSchema);

export default Payment;
