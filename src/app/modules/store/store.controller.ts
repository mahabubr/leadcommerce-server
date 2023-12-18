import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IStores } from './store.interface';
import { StoreServices } from './store.services';

const createStore = catAsync(async (req: Request, res: Response) => {
  const { ...storeData } = req.body;

  const result = await StoreServices.createStore(storeData);

  sendResponse<IStores | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'orders created successfully',
    data: result,
  });
});

const getAllStore = catAsync(async (req: Request, res: Response) => {
  const result = await StoreServices.getAllStore();

  sendResponse<IStores[] | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'orders created successfully',
    data: result,
  });
});

export const StoreController = {
  createStore,
  getAllStore,
};
