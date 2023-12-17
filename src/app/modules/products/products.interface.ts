import { Model } from 'mongoose';

export type IProducts = {
  title: string;
  description: string;
  price: number;
  deliveryTime: string;
  inStocks: boolean;
  status: string;
};

export type ProductsModel = Model<IProducts, Record<string, unknown>>;
