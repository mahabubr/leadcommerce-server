import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { DashboardServices } from './dashboard.services';

const getDashboardInfo = catAsync(async (req: Request, res: Response) => {
  const result = await DashboardServices.getDashboardInfo();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data fetch successfully',
    data: result,
  });
});

export const DashboardController = {
  getDashboardInfo,
};
