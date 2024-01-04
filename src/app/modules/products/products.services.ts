/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { ProductSearchableFields } from './products.constant';
import { IProducts, IProductsFilters } from './products.interface';
import { Products } from './products.model';

// * create product
const createProduct = async (
  payload: IProducts,
  storeId: any
): Promise<IProducts | null> => {
  payload.store_id = storeId;
  const result = await Products.create(payload);
  return result;
};

// * get all products

const getAllProducts = async (
  filters: Partial<IProductsFilters>,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IProducts[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: ProductSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereCondition =
    andCondition.length > 0 ? { $and: andCondition } : { status: 'active' };

  const result = await Products.find(whereCondition)
    .populate('store_id')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Products.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// * get single product
const getSingleProduct = async (id: string): Promise<IProducts | null> => {
  const result = await Products.findById(id);
  return result;
};
// * get single product
const getAllStoreProduct = async (id: string): Promise<IProducts[] | null> => {
  const result = await Products.find({ store_id: id });
  return result;
};

// * update single product
const updateProduct = async (
  id: string,
  payload: Partial<IProducts>
): Promise<IProducts | null> => {
  const isExist = await Products.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'product is not exist');
  }

  const result = await Products.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

// * delete single product
const deleteProduct = async (id: string): Promise<IProducts | null> => {
  const isExist = await Products.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'This user is not exist');
  }

  const result = await Products.findByIdAndDelete(id);
  return result;
};

const getAllProductsForStore = async (
  filters: Partial<IProductsFilters>,
  paginationOptions: IPaginationOptions,
  store_id: string
): Promise<IGenericResponse<IProducts[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: ProductSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (store_id) {
    andCondition.push({
      store_id: {
        $eq: store_id,
      },
    });
  }

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereCondition =
    andCondition.length > 0 ? { $and: andCondition } : { status: 'active' };

  const result = await Products.find(whereCondition)
    .populate('store_id')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Products.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleStoreProducts = async (id: string) => {
  return await Products.find({
    store_id: id,
  }).limit(3);
};

export const ProductsServices = {
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  getAllStoreProduct,
  getAllProducts,
  getAllProductsForStore,
  getSingleStoreProducts,
};
