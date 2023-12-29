import { Model, Schema } from 'mongoose';
import { IPaymentStatus } from '../order/order.interface';

export type IPayment = {
  total_amount: number;
  order_id: Schema.Types.ObjectId;
  payment_status: IPaymentStatus;
  payment_code: string;
  payment_method: string;
  user_id: Schema.Types.ObjectId;
  shop_id: Schema.Types.ObjectId;
  products: [];
};

export type PaymentModel = Model<IPayment, Record<string, unknown>>;

export type IPaymentFilters = {
  searchTerm: string;
  total_amount: string;
  order_id: string;
  payment_status: string;
  payment_code: string;
  user_id: string;
  shop_id: string;
};

export const PaymentSearchableFields = ['payment_status', 'payment_code'];
export const PaymentFilterableFields = [
  'searchTerm',
  'payment_status',
  'payment_code',
];
