import { Schema, Types, model } from 'mongoose';
import { EmployeModel, IEmploye } from './employees.interfaces';

const EmployeSchema = new Schema<IEmploye>(
  {
    image: {
      avatar: { type: String },
      avatar_public_url: { type: String },
    },
    full_name: { type: String, required: true },
    position: { type: String, required: true },
    shop_id: {
      type: Types.ObjectId,
      ref: 'Store',
      // required: true,
    },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    country: { type: String, default: 'United States' },
    income: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Employe = model<IEmploye, EmployeModel>('Employe', EmployeSchema);

export default Employe;
