import { Schema, Types, model } from 'mongoose';
import { PaymentStatus } from '../order/order.constant';
import { IPayment, PaymentModel } from './payment.interface';

const PaymentSchema = new Schema<IPayment>(
  {
    total_amount: { type: Number, required: true },
    order_id: { type: Schema.Types.ObjectId, required: true },
    payment_status: {
      type: String,
      enum: PaymentStatus, // Assuming PaymentStatus is an array of allowed values
      required: true,
    },
    payment_code: { type: String, required: true },
    payment_method: { type: String, required: true },
    user_id: { type: Types.ObjectId, ref: 'Employe', required: true },
    shop_id: { type: Types.ObjectId, ref: 'Store', required: true },
    products: [
      {
        image: {
          avatar: { type: String, required: true },
          avatar_public_url: { type: String, required: true },
        },
        productName: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        total: { type: Number, required: true },
      },
    ],
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