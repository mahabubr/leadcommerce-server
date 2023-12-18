import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/paginationConstants';
import catAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { OrderFilterableFields } from './order.constant';
import { IOrders } from './order.interface';
import { OrdersServices } from './order.services';

// * create Order
const createOrder = catAsync(async (req: Request, res: Response) => {
  const { ...OrderData } = req.body;

  const result = await OrdersServices.createOrder(OrderData);

  sendResponse<IOrders | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'orders created successfully',
    data: result,
  });
});

// * get all Orders
const getAllOrders = catAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, OrderFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await OrdersServices.getAllOrders(filters, paginationOptions);

  sendResponse<IOrders[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All order retrieved successfully',
    meta: result?.meta,
    data: result?.data,
  });
});

export const OrdersController = {
  createOrder,
  getAllOrders,
};
