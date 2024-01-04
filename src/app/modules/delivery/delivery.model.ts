import { Schema, model } from 'mongoose';
import { DeliveryModel, IDelivery } from './delivery.interface';

const DeliverySchema = new Schema<IDelivery>(
  {
    image: {
      avatar: { type: String },
      avatar_public_url: { type: String },
    },
    full_name: { type: String, required: true },
    position: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, default: null },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Delivery = model<IDelivery, DeliveryModel>('Delivery', DeliverySchema);

export default Delivery;
