import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/paginationConstants';
import catAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { StoreFilterableFields } from './store.constants';
import { IStores } from './store.interface';
import { StoreServices } from './store.services';

const createStore = catAsync(async (req: Request, res: Response) => {
  const { ...storeData } = req.body;

  const result = await StoreServices.createStore(storeData);

  sendResponse<IStores | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Stores created successfully',
    data: result,
  });
});

// get multiple data from database
const getAllStore = catAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, StoreFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await StoreServices.getAllStore(filters, paginationOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Stores retrived successfully',
    meta: result?.meta,
    data: result?.data,
  });
});

const getSingleStore = catAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await StoreServices.getSingleStore(id);

  sendResponse<IStores | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Store Fetched successfully',
    data: result,
  });
});

// * update Store

const updateStore = catAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await StoreServices.updateStore(id, updatedData);

  sendResponse<IStores | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Store updated successfully',
    data: result,
  });
});

// * delete single Store
const deleteStore = catAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await StoreServices.deleteStore(id);

  sendResponse<IStores | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Store deleted successfully',
    data: result,
  });
});

export const StoreController = {
  createStore,
  getAllStore,
  getSingleStore,
  updateStore,
  deleteStore,
};
