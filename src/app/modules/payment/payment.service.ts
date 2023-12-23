import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import {
  IPayment,
  IPaymentFilters,
  PaymentSearchableFields,
} from './payment.interface';
import Payment from './payment.model';

const createPayment = async (payload: IPayment): Promise<IPayment> => {
  const PaymentExist = await Payment.findOne({ order_id: payload.order_id });
  // checking order is already used or not
  if (PaymentExist) {
    throw new ApiError(httpStatus.CONFLICT, 'order_id is already used');
  }

  const result = await Payment.create(payload);
  return result;
};

// get multiple data from Payment py pagination and searching
const getAllPayment = async (
  filters: Partial<IPaymentFilters>,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IPayment[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: PaymentSearchableFields.map(field => ({
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

  const result = await Payment.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Payment.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// * get single Payments
const getSinglePayment = async (id: string): Promise<IPayment | null> => {
  const result = await Payment.findById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Payment not found');
  }
  return result;
};

// * update single Product
const updatePayment = async (
  id: string,
  payload: Partial<IPayment>
): Promise<IPayment | null> => {
  const isExist = await Payment.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Payment is not found');
  }

  if (payload.order_id) {
    const isExist = await Payment.find({ order_id: payload.order_id });
    if (isExist)
      throw new ApiError(httpStatus.CONFLICT, 'Order_id is already in used');
  }

  const result = await Payment.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

// * delete single product
const deletePayment = async (id: string): Promise<IPayment | null> => {
  const isExist = await Payment.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Payment not found');
  }

  const result = await Payment.findByIdAndDelete(id);
  return result;
};

export const PaymentServices = {
  createPayment,
  getAllPayment,
  getSinglePayment,
  updatePayment,
  deletePayment,
};
