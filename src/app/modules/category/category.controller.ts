import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/paginationConstants';
import catAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { ICategory } from './category.interface';
import { CategoryServices } from './category.services';
import { CategoryFilterableFields } from './category.constant';

// * create category
const createCategory = catAsync(async (req: Request, res: Response) => {

    const result = await CategoryServices.createCategory(req.body);

    sendResponse<ICategory | null>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category created successfully',
        data: result,
    });
});

// * get all Category
const getAllCategory = catAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, CategoryFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await CategoryServices.getAllCategory(
        filters,
        paginationOptions
    );

    sendResponse<ICategory[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category retrieved successfully',
        meta: result?.meta,
        data: result?.data,
    });
});

// * get single Category
const getSingleCategory = catAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CategoryServices.getSingleCategory(id);

    sendResponse<ICategory | null>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category Fetched successfully',
        data: result,
    });
});

// * update Category
const updateCategory = catAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await CategoryServices.updateCategory(id, updatedData);

    sendResponse<ICategory | null>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category updated successfully',
        data: result,
    });
});

// * delete single Category
const deleteCategory = catAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CategoryServices.deleteCategory(id);

    sendResponse<ICategory | null>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category deleted successfully',
        data: result,
    });
});

export const CatregoryController = {
    createCategory,
    getAllCategory,
    updateCategory,
    deleteCategory,
    getSingleCategory
};
