import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import {
  IShipment,
  IShipmentFilters,
  ShipmentSearchableFields,
} from './shipment.interface';
import Shipment from './shipment.model';

const createShipment = async (payload: IShipment): Promise<IShipment> => {
  const ShipmentExist = await Shipment.findOne({ order_id: payload.order_id });
  // checking order_id is already used or not
  if (ShipmentExist) {
    throw new ApiError(httpStatus.CONFLICT, 'order_id is already used');
  }

  const result = await Shipment.create(payload);
  return result;
};

// get multiple data from Shipment py pagination and searching
const getAllShipment = async (
  filters: Partial<IShipmentFilters>,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IShipment[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: ShipmentSearchableFields.map(field => ({
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

  const result = await Shipment.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Shipment.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// * get single Shipments
const getSingleShipment = async (id: string): Promise<IShipment | null> => {
  const result = await Shipment.findById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Shipment not found');
  }
  return result;
};

// * update single Product
const updateShipment = async (
  id: string,
  payload: Partial<IShipment>
): Promise<IShipment | null> => {
  const isExist = await Shipment.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Shipment is not found');
  }

  if (payload.order_id) {
    const isExist = await Shipment.find({ order_id: payload.order_id });
    if (isExist)
      throw new ApiError(httpStatus.CONFLICT, 'Order_id is already in used');
  }

  const result = await Shipment.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

// * delete single product
const deleteShipment = async (id: string): Promise<IShipment | null> => {
  const isExist = await Shipment.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Shipment not found');
  }

  const result = await Shipment.findByIdAndDelete(id);
  return result;
};

export const ShipmentServices = {
  createShipment,
  getAllShipment,
  getSingleShipment,
  updateShipment,
  deleteShipment,
};
