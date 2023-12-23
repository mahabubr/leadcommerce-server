import { Model } from 'mongoose';

export type IStores = {
  logo?: string;
  name: string;
  owner_name?: string;
  email: string;
  password: string;
  contact_no?: string;
  location?: string;
  total_orders?: string;
  earning?: [];
  refund?: number;
  balance: number;
  company_type: string;
  website: string;
};

export type StoreModel = Model<IStores, Record<string, unknown>>;

export type IStoreFilters = {
  searchTerm: string;
  name: string;
  owner_name: string;
  email: string;
  contact_no: string;
  location: string;
};
