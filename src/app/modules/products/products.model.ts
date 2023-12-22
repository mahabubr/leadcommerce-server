import { Schema, model } from 'mongoose';
import { ProductStatus } from './products.constant';
import { IProducts, ProductsModel } from './products.interface';

const ProductsSchema = new Schema<IProducts, ProductsModel>(
  {
    image: {
      avatar: { type: String },
      avatar_public_url: { type: String },
    },
    productName: {
      type: String,
      required: true,
    },
    categories: {
      type: [String],
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    fullDescription: {
      type: String,
      required: true,
    },
    color: {
      type: [String],
    },
    size: {
      type: [String],
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
    },
    productTags: {
      type: [String],
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ProductStatus,
      default: 'active',
    },
  },
<<<<<<< HEAD
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
=======
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
>>>>>>> 07f52dfaeca4a0824192ddbe75625e9910a09205

export const Products = model<IProducts, ProductsModel>(
  'Products',
  ProductsSchema
);
