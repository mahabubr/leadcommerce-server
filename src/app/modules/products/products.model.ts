import { Schema, model } from 'mongoose';
import { ProductStatus } from './products.constant';
import { IProducts, ProductsModel } from './products.interface';

const ProductsSchema = new Schema<IProducts, ProductsModel>({
  image: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  categories: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  color: {
    type: [String],
    required: true,
  },
  size: {
    type: [String],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  fullDetail: {
    type: String,
    required: true,
  },
  productTags: {
    type: [String],
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ProductStatus,
  },
});

export const Products = model<IProducts, ProductsModel>(
  'Products',
  ProductsSchema
);
