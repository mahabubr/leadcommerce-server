import { Schema, Types, model } from 'mongoose';
import { EmployeModel, IEmploye } from './employees.interface';

const EmployeSchema = new Schema<IEmploye>(
  {
    image: { type: String },
    full_name: { type: String, required: true },
    position: { type: String, required: true },
    shop_id: {
      type: Types.ObjectId,
      ref: 'Store',
      required: true,
    },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    country: { type: String, default: 'United States' },
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
