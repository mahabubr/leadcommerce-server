import { Model } from 'mongoose';

export type IDelivery = {
  image: string;
  full_name: string;
  position: string;
  email: string;
  phone: string;
  password: string;
  address: string;
  country: string;
};

export type DeliveryModel = Model<IDelivery, Record<string, unknown>>;

export type IDeliveryFilters = {
  searchTerm: string;
  name: string;
  email: string;
  phone: string;
};

export const DeliverySearchableFields = [
  'full_name',
  'email',
  'phone',
  'address',
];
export const DeliveryFilterableFields = [
  'searchTerm',
  'full_name',
  'email',
  'shop_id',
  'phone',
  'address',
];
