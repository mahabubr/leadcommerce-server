import { Model, Types } from 'mongoose';

export type IProductStatus = 'pending' | 'active' | 'restrict';
// export type IProductsSize = 'S' | 'M' | 'L' | 'XL' | 'XXL';
// export type IProductsColor = 'red' | 'green' | 'yellow' | 'orange' | 'black';

export type IProducts = {
  image?: { avatar?: string; avatar_public_url?: string };
  // new_image?: { avatar?: string; avatar_public_url?: string };
  productName: string;
  _id?: string;
  categories: string;
  slug: string;
  description: string;
  fullDescription: string;
  color: string[];
  size: string[];
  price: number;
  quantity: number;
  fullDetail: string;
  productTags: string[];
  status: IProductStatus;
  store_id: Types.ObjectId;
};

export type IProductsFilters = {
  searchTerm: string;
};
export type ProductsModel = Model<IProducts, Record<string, unknown>>;
