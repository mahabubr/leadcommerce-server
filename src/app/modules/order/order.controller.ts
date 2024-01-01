import { Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
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
  const decoded = jwt.decode(req.headers.authorization as string) as JwtPayload;
  const result = await OrdersServices.createOrder(OrderData, decoded.id);

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

// * get single product
const getSingleOrder = catAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OrdersServices.getSingleOrder(id);

  sendResponse<IOrders | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order Fetched successfully',
    data: result,
  });
});

// * update Order

const updateOrder = catAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await OrdersServices.updateOrder(id, updatedData);

  sendResponse<IOrders | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order updated successfully',
    data: result,
  });
});
const updateStatus = catAsync(async (req: Request, res: Response) => {
  const updatedData = req.body;
  const result = await OrdersServices.updateStatus(updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order updated successfully',
    data: result,
  });
});

// * delete single Order
const deleteOrder = catAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OrdersServices.deleteOrder(id);

  sendResponse<IOrders | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders deleted successfully',
    data: result,
  });
});

export const OrdersController = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
  updateStatus,
};
