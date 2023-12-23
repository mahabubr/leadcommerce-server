import { Schema, model } from 'mongoose';
import { IStores, StoreModel } from './store.interface';

const StoreSchema = new Schema<IStores>(
  {
    logo: {
      type: String,
      default: null,
    },
    name: { type: String, required: true },
    owner_name: { type: String, default: null },
    email: { type: String, required: true },
    password: { type: String, required: true },
    contact_no: { type: String, default: null },
    location: { type: String, default: null },
    total_orders: { type: String, default: null },
    earning: { type: [], default: null },
    refund: { type: Number, default: null },
    balance: { type: Number, default: null },
    company_type: { type: String, default: null },
    website: { type: String, default: null },
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
