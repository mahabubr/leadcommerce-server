import { Model } from 'mongoose';

export type IAdmin = {
  image: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
};

export type AdminModel = Model<IAdmin, Record<string, unknown>>;

export type IAdminFilters = {
  searchTerm: string;
  name: string;
  email: string;
  phone: string;
};
