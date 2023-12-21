import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/paginationConstants';
import catAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AdminFilterableFields } from './admin.constant';
import { IAdmin } from './admin.interface';
import { AdminServices } from './admin.service';

const createAdmin = catAsync(async (req: Request, res: Response) => {
  const { ...AdminData } = req.body;

  const result = await AdminServices.createAdmin(AdminData);

  sendResponse<IAdmin | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins created successfully',
    data: result,
  });
});

// get multiple data from database
const getAllAdmin = catAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, AdminFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await AdminServices.getAllAdmin(filters, paginationOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins retrived successfully',
    meta: result?.meta,
    data: result?.data,
  });
});

const getSingleAdmin = catAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AdminServices.getSingleAdmin(id);

  sendResponse<IAdmin | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin Fetched successfully',
    data: result,
  });
});

// * update Admin

const updateAdmin = catAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await AdminServices.updateAdmin(id, updatedData);

  sendResponse<IAdmin | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin updated successfully',
    data: result,
  });
});

// * delete single Admin
const deleteAdmin = catAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AdminServices.deleteAdmin(id);

  sendResponse<IAdmin | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin deleted successfully',
    data: result,
  });
});

export const AdminController = {
  createAdmin,
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
