import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import Employe from '../employe/employe.model';
import Store from '../store/store.model';
import { AdminSearchableFields } from './admin.constant';
import { IAdmin, IAdminFilters } from './admin.interface';
import Admin from './admin.model';

const createAdmin = async (payload: IAdmin): Promise<IAdmin> => {
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

  const { address, email, full_name, image, password, phone } = payload;

  const hash = await bcrypt.hash(password, 12);

  const createPayload = {
    address,
    email,
    full_name,
    image,
    password: hash,
    phone,
  };

  const result = await Admin.create(createPayload);
  return result;
};

// get multiple data from Admin py pagination and searching
const getAllAdmin = async (
  filters: Partial<IAdminFilters>,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAdmin[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: AdminSearchableFields.map(field => ({
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

  const result = await Admin.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Admin.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// * get single Admins
const getSingleAdmin = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found');
  }
  return result;
};

// * update single Product
const updateAdmin = async (
  id: string,
  payload: Partial<IAdmin>
): Promise<IAdmin | null> => {
  const isExist = await Admin.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin is not found');
  }

  const result = await Admin.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

// * delete single product
const deleteAdmin = async (id: string) => {
  const isExist = await Admin.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found');
  }

  const result = await Admin.findByIdAndDelete(id);
  return result;
};

export const AdminServices = {
  createAdmin,
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
