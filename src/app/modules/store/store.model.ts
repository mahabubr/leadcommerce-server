import { Schema, model } from 'mongoose';
import { IStores, StoreModel } from './store.interface';

const StoreSchema = new Schema<IStores>(
  {
    logo: { type: String },
    name: { type: String, required: true },
    owner_name: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    contact_no: { type: String },
    location: { type: String },
    total_orders: { type: String },
    earning: { type: Number },
    refund: { type: Number },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Store = model<IStores, StoreModel>('Store', StoreSchema);

export default Store;
