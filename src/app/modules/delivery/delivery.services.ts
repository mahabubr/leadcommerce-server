import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import Admin from '../admin/admin.model';
import Store from '../store/store.model';
import {
  DeliverySearchableFields,
  IDelivery,
  IDeliveryFilters,
} from './delivery.interface';
import Delivery from './delivery.model';
import Employe from '../employe/employe.model';

const createDelivery = async (payload: IDelivery): Promise<IDelivery> => {
  const admin = await Admin.findOne({ email: payload.email });
  const employee = await Employe.findOne({ email: payload.email });
  const store = await Store.findOne({ email: payload.email });
  const delivery = await Delivery.findOne({ email: payload.email });

  // checking Email is already used or not
  if (admin) {
    throw new ApiError(httpStatus.CONFLICT, 'Admin is already used');
  }
  if (employee) {
    throw new ApiError(httpStatus.CONFLICT, 'Employee is already used');
  }
  if (store) {
    throw new ApiError(httpStatus.CONFLICT, 'Store is already used');
  }
  if (delivery) {
    throw new ApiError(httpStatus.CONFLICT, 'Delivery is already used');
  }

  const { address, email, full_name, image, password, phone, position } =
    payload;

  const hash = await bcrypt.hash(password, 12);

  const createPayload = {
    address,
    email,
    full_name,
    image,
    password: hash,
    phone,
    position,
  };

  const result = await Delivery.create(createPayload);
  return result;
};

const getAllDelivery = async (
  filters: Partial<IDeliveryFilters>,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IDelivery[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: DeliverySearchableFields.map(field => ({
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

  const result = await Delivery.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Delivery.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleDelivery = async (id: string): Promise<IDelivery | null> => {
  const result = await Delivery.findById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Delivery not found');
  }
  return result;
};

const updateDelivery = async (
  id: string,
  payload: Partial<IDelivery>
): Promise<IDelivery | null> => {
  const isExist = await Delivery.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Delivery is not found');
  }

  // if (payload.email) {
  //   const isExist = await Delivery.find({ email: payload.email });
  //   if (isExist)
  //     throw new ApiError(httpStatus.CONFLICT, 'Email is already in used');
  // }

  const result = await Delivery.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteDelivery = async (id: string) => {
  const isExist = await Delivery.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Delivery not found');
  }

  const result = await Delivery.findByIdAndDelete(id);
  return result;
};

export const DeliveryServices = {
  deleteDelivery,
  updateDelivery,
  getSingleDelivery,
  createDelivery,
  getAllDelivery,
};
