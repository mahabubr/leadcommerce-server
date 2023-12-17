import { Schema, model } from 'mongoose';
import { IProducts, ProductsModel } from './products.interface';

const ProductsSchema = new Schema<IProducts, ProductsModel>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  deliveryTime: {
    type: String,
    required: true,
  },
  inStocks: {
    type: Boolean,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

export const Products = model<IProducts, ProductsModel>(
  'Products',
  ProductsSchema
);
