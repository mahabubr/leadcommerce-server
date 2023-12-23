import { Model, Schema } from 'mongoose';

export type IEmploye = {
  image: string;
  full_name: string;
  position: string;
  shop_id: Schema.Types.ObjectId;
  email: string;
  phone: string;
};

export type EmployeModel = Model<IEmploye, Record<string, unknown>>;

export type IEmployeFilters = {
  searchTerm: string;
  name: string;
  email: string;
  phone: string;
};

export const EmployeSearchableFields = [
  'full_name',
  'email',
  'phone',
  'positon',
];
export const EmployeFilterableFields = [
  'searchTerm',
  'full_name',
  'email',
  'shop_id',
  'phone',
  'positon',
];
