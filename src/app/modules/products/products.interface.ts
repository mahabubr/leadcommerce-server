import { Model } from 'mongoose';

export type IProductStatus = 'pending' | 'active' | 'restrict';
// export type IProductsSize = 'S' | 'M' | 'L' | 'XL' | 'XXL';
// export type IProductsColor = 'red' | 'green' | 'yellow' | 'orange' | 'black';

export type IProducts = {
  image: string;
  productName: string;
  categories: string;
  slug: string;
  shortDescription: string;
  color: string[];
  size: string[];
  price: number;
  quantity: number;
  fullDetail: string;
  productTags: string[];
  status: IProductStatus;
};

export type IProductsFilters = {
  searchTerm: string;
};
export type ProductsModel = Model<IProducts, Record<string, unknown>>;
