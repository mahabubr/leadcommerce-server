import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.services';

const loginUser = catAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;

  const result = await AuthService.loginUser(loginData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'orders created successfully',
    data: result,
  });
});

const refreshToken = catAsync(async (req: Request, res: Response) => {
  const { ...token } = req.body;

  const result = await AuthService.refreshToken(token);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'orders created successfully',
    data: result,
  });
});

export const AuthController = {
  loginUser,
  refreshToken,
};
