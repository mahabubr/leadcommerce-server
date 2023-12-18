import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
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

export const OrdersController = {
  createOrder,
};
