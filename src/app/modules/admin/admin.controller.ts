import { Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import cloudinary from '../../../config/cloudinary';
import { paginationFields } from '../../../constants/paginationConstants';
import catAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AdminFilterableFields } from './admin.constant';
import { IAdmin } from './admin.interface';
import { AdminServices } from './admin.service';

const createAdmin = catAsync(async (req: Request, res: Response) => {
  const { ...AdminData } = req.body;
  if (req.file) {
    const uploadedImage = await cloudinary.uploader.upload(req.file?.path);
    const avatar = {
      avatar: uploadedImage.secure_url,
      avatar_public_url: uploadedImage.public_id,
    };
    AdminData.image = avatar;
  }

  const result = await AdminServices.createAdmin(AdminData);

  sendResponse<IAdmin | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins created successfully',
    data: result,
  });
});

const getSingleAdminWithtoken = catAsync(
  async (req: Request, res: Response) => {
    const decoded = jwt.decode(
      req.headers.authorization as string
    ) as JwtPayload;

    const result = await AdminServices.getSingleAdmin(decoded.id);

    sendResponse<IAdmin | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin Fetched successfully',
      data: result,
    });
  }
);

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
  const decoded = jwt.decode(req.headers.authorization as string) as JwtPayload;
  const { ...updatedData } = req.body;

  if (req.file) {
    const uploadedImage = await cloudinary.uploader.upload(req.file?.path);
    const avatar = {
      avatar: uploadedImage.secure_url,
      avatar_public_url: uploadedImage.public_id,
    };
    updatedData.image = avatar;
  }
  const result = await AdminServices.updateAdmin(decoded.id, updatedData);

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

  sendResponse(res, {
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
  getSingleAdminWithtoken,
  updateAdmin,
  deleteAdmin,
};
