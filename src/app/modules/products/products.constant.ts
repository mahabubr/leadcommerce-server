import { IProductStatus } from './products.interface';

export const ProductStatus: IProductStatus[] = [
  'pending',
  'active',
  'restrict',
];

export const ProductSearchableFields = ['productName', 'slug'];
export const ProductFilterableFields = [
  'productName',
  'searchTerm',
  'price',
  'quantity',
];
