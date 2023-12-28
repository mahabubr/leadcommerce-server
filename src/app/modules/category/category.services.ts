import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { ICategory, ICategoryFilters } from './category.interface';
import { Category } from './category.model';
import { CategorySearchableFields } from './category.constant';

// * create Category
const createCategory = async (payload: ICategory): Promise<ICategory | null> => {
    const result = await Category.create(payload);
    return result;
};

// * get all Category
const getAllCategory = async (
    filters: Partial<ICategoryFilters>,
    paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICategory[]>> => {
    const { searchTerm, ...filtersData } = filters;
    const { page, limit, skip, sortBy, sortOrder } =
        paginationHelpers.calculatePagination(paginationOptions);

    const andCondition = [];

    if (searchTerm) {
        andCondition.push({
            $or: CategorySearchableFields.map(field => ({
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

    const result = await Category.find(whereCondition)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);

    const total = await Category.countDocuments(whereCondition);

    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};

// * get single Category
const getSingleCategory = async (id: string): Promise<ICategory | null> => {
    const result = await Category.findOne({ _id: id });
    return result;
};

// * update single Category
const updateCategory = async (
    id: string,
    payload: Partial<ICategory>
): Promise<ICategory | null> => {
    const isExist = await Category.findById(id);

    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'This category is not exist');
    }

    const result = await Category.findOneAndUpdate({ _id: id }, payload, {
        new: true, runValidators: true
    });

    return result;
};

// * delete single Category
const deleteCategory = async (id: string): Promise<ICategory | null> => {
    const isExist = await Category.findById(id);

    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'This category is not exist');
    }

    const result = await Category.findByIdAndDelete(id);
    return result;
};

export const CategoryServices = {
    createCategory,
    updateCategory,
    deleteCategory,
    getSingleCategory,
    getAllCategory,
};
