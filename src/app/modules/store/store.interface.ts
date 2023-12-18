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
  earning?: number;
  refund?: number;
};

export type StoreModel = Model<IStores, Record<string, unknown>>;
