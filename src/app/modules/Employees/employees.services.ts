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
  EmployeSearchableFields,
  IEmploye,
  IEmployeFilters,
} from './employees.interfaces';
import Employe from './employees.model';

const createEmploye = async (payload: IEmploye): Promise<IEmploye> => {
  console.log(payload,"🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀")
  const admin = await Admin.findOne({ email: payload.email });
  const employee = await Employe.findOne({ email: payload.email });
  const store = await Store.findOne({ email: payload.email });

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

  const { email, full_name, image, password, phone, position, shop_id } =
    payload;

  const hash = await bcrypt.hash(password, 12);

  const createPayload = {
    email,
    full_name,
    image,
    password: hash,
    phone,
    position,
    shop_id,
  };

  const result = await Employe.create(createPayload);
  return result;
};

// get multiple data from Employe py pagination and searching
const getAllEmploye = async (
  filters: Partial<IEmployeFilters>,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IEmploye[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: EmployeSearchableFields.map(field => ({
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

  const result = await Employe.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)


  const total = await Employe.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// * get single Employes
const getSingleEmploye = async (id: string): Promise<IEmploye | null> => {
  const result = await Employe.findById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employe not found');
  }
  return result;
};

// * update single Product
const updateEmploye = async (
  id: string,
  payload: Partial<IEmploye>
): Promise<IEmploye | null> => {
  const isExist = await Employe.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employe is not found');
  }

  if (payload.email) {
    const isExist = await Employe.find({ email: payload.email });
    if (isExist)
      throw new ApiError(httpStatus.CONFLICT, 'Email is already in used');
  }

  const result = await Employe.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

// * delete single product
const deleteEmploye = async (id: string): Promise<IEmploye | null> => {
  const isExist = await Employe.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employe not found');
  }

  const result = await Employe.findByIdAndDelete(id);
  return result;
};

export const EmployeServices = {
  createEmploye,
  getAllEmploye,
  getSingleEmploye,
  updateEmploye,
  deleteEmploye,
};
