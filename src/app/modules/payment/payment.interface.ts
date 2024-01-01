import { Model, Schema } from 'mongoose';
import { IPaymentStatus } from '../order/order.interface';

export type IPayment = {
  total_amount: number;
  order_id: Schema.Types.ObjectId;
  payment_status: IPaymentStatus;
  description: string;
};

export type PaymentModel = Model<IPayment, Record<string, unknown>>;

export type IPaymentFilters = {
  searchTerm: string;
  total_amount: string;
  order_id: string;
  payment_status: string;
  description: string;
};

export const PaymentSearchableFields = ['payment_status', 'payment_code'];
export const PaymentFilterableFields = [
  'searchTerm',
  'payment_status',
  'payment_code',
];
