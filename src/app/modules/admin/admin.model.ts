import { Schema, model } from 'mongoose';
import { AdminModel, IAdmin } from './admin.interface';

const AdminSchema = new Schema<IAdmin>(
  {
    image: { type: String },
    full_name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Admin = model<IAdmin, AdminModel>('Admin', AdminSchema);

export default Admin;
