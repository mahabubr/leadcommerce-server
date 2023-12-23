import { Schema, Types, model } from 'mongoose';
import { EmployeModel, IEmploye } from './Employees.interface';

const EmployeSchema = new Schema<IEmploye>(
  {
    image: { type: String },
    full_name: { type: String, required: true },
    position: { type: String, required: true },
    shop_id: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    email: { type: String, required: true },
    phone: { type: String, required: true },
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
