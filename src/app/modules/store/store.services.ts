import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { StoreSearchableFields } from './store.constants';
import { IStoreFilters, IStores } from './store.interface';
import Store from './store.model';

const createStore = async (payload: IStores): Promise<IStores> => {
  const store = await Store.findOne({ email: payload.email });
  // checking Email is already used or not
  if (store) {
    console.log(store);
    throw new ApiError(httpStatus.CONFLICT, 'Email is already used');
  }
  const {
    password,
    email,
    name,
    contact_no,
    earning,
    location,
    logo,
    owner_name,
    refund,
    total_orders,
  } = payload;

  const hash = await bcrypt.hash(password, 12);

  const payloadData = {
    password: hash,
    email,
    name,
    contact_no,
    earning,
    location,
    logo,
    owner_name,
    refund,
    total_orders,
  };

  const result = await Store.create(payloadData);
  return result;
};

// get multiple data from store py pagination and searching
const getAllStore = async (
  filters: Partial<IStoreFilters>,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IStores[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: StoreSearchableFields.map(field => ({
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

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await Store.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Store.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// * get single Stores
const getSingleStore = async (id: string): Promise<IStores | null> => {
  const result = await Store.findById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Store not found');
  }
  return result;
};

// * update single Product
const updateStore = async (
  id: string,
  payload: Partial<IStores>
): Promise<IStores | null> => {
  const isExist = await Store.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Store is not found');
  }

  if (payload.email) {
    const isExist = await Store.find({ email: payload.email });
    if (isExist)
      throw new ApiError(httpStatus.CONFLICT, 'Email is already in used');
  }

  const result = await Store.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

// * delete single product
const deleteStore = async (id: string): Promise<IStores | null> => {
  const isExist = await Store.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Store not found');
  }

  const result = await Store.findByIdAndDelete(id);
  return result;
};

export const StoreServices = {
  createStore,
  getAllStore,
  getSingleStore,
  updateStore,
  deleteStore,
};
