import { Schema, Types, model } from 'mongoose';
import { PaymentStatus } from '../order/order.constant';
import { IPayment, PaymentModel } from './payment.interface';

const PaymentSchema = new Schema<IPayment>(
  {
    total_amount: { type: Number, required: true },
    order_id: { type: Types.ObjectId, ref: 'Orders' },
    payment_status: {
      type: String,
      enum: PaymentStatus,
      required: true,
    },
    description: { type: String, default: '' },
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
