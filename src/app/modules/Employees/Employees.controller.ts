import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/paginationConstants';
import catAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { EmployeFilterableFields, IEmploye } from './employees.interface';
import { EmployeServices } from './employees.services';

const createEmploye = catAsync(async (req: Request, res: Response) => {
  const { ...EmployeData } = req.body;

  const result = await EmployeServices.createEmploye(EmployeData);

  sendResponse<IEmploye | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Employes created successfully',
    data: result,
  });
});

// get multiple data from database
const getAllEmploye = catAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, EmployeFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await EmployeServices.getAllEmploye(
    filters,
    paginationOptions
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Employes retrived successfully',
    meta: result?.meta,
    data: result?.data,
  });
});

const getSingleEmploye = catAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await EmployeServices.getSingleEmploye(id);

  sendResponse<IEmploye | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Employe Fetched successfully',
    data: result,
  });
});

// * update Employe

const updateEmploye = catAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await EmployeServices.updateEmploye(id, updatedData);

  sendResponse<IEmploye | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Employe updated successfully',
    data: result,
  });
});

// * delete single Employe
const deleteEmploye = catAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await EmployeServices.deleteEmploye(id);

  sendResponse<IEmploye | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Employe deleted successfully',
    data: result,
  });
});

export const EmployeController = {
  createEmploye,
  getAllEmploye,
  getSingleEmploye,
  updateEmploye,
  deleteEmploye,
};