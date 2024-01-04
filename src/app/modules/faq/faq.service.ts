import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { faqSearchableFields, IFaq, IFaqFilters } from './faq.interface';
import Faq from './faq.model';

const createFaq = async (payload: IFaq): Promise<IFaq> => {
  const result = await Faq.create(payload);
  return result;
};

// get multiple data from Faq py pagination and searching
const getAllFaq = async (
  filters: Partial<IFaqFilters>,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IFaq[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: faqSearchableFields.map(field => ({
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

  const result = await Faq.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Faq.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// * get single Faqs
const getSingleFaq = async (id: string): Promise<IFaq | null> => {
  const result = await Faq.findById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faq not found');
  }
  return result;
};

// * update single Product
const updateFaq = async (
  id: string,
  payload: Partial<IFaq>
): Promise<IFaq | null> => {
  const isExist = await Faq.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faq is not found');
  }

  const result = await Faq.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

// * delete single product
const deleteFaq = async (id: string): Promise<IFaq | null> => {
  const isExist = await Faq.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faq not found');
  }

  const result = await Faq.findByIdAndDelete(id);
  return result;
};

export const faqServices = {
  createFaq,
  getAllFaq,
  getSingleFaq,
  updateFaq,
  deleteFaq,
};
