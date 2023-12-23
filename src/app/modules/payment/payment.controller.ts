import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/paginationConstants';
import catAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IPayment, PaymentFilterableFields } from './payment.interface';
import { PaymentServices } from './payment.service';

const createPayment = catAsync(async (req: Request, res: Response) => {
  const { ...PaymentData } = req.body;

  const result = await PaymentServices.createPayment(PaymentData);

  sendResponse<IPayment | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payments created successfully',
    data: result,
  });
});

// get multiple data from database
const getAllPayment = catAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, PaymentFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await PaymentServices.getAllPayment(
    filters,
    paginationOptions
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payments retrived successfully',
    meta: result?.meta,
    data: result?.data,
  });
});

const getSinglePayment = catAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PaymentServices.getSinglePayment(id);

  sendResponse<IPayment | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment Fetched successfully',
    data: result,
  });
});

// * update Payment

const updatePayment = catAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await PaymentServices.updatePayment(id, updatedData);

  sendResponse<IPayment | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment updated successfully',
    data: result,
  });
});

// * delete single Payment
const deletePayment = catAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PaymentServices.deletePayment(id);

  sendResponse<IPayment | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment deleted successfully',
    data: result,
  });
});

export const PaymentController = {
  createPayment,
  getAllPayment,
  getSinglePayment,
  updatePayment,
  deletePayment,
};
