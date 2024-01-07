import { Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import cloudinary from '../../../config/cloudinary';
import { paginationFields } from '../../../constants/paginationConstants';
import catAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { DeliveryFilterableFields, IDelivery } from './delivery.interface';
import { DeliveryServices } from './delivery.services';

const createDelivery = catAsync(async (req: Request, res: Response) => {
  const { ...DeliveryData } = req.body;

  if (req.file) {
    const uploadedImage = await cloudinary.uploader.upload(req.file?.path);
    const avatar = {
      avatar: uploadedImage.secure_url,
      avatar_public_url: uploadedImage.public_id,
    };
    DeliveryData.image = avatar;
  }

  const result = await DeliveryServices.createDelivery(DeliveryData);

  sendResponse<IDelivery | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delivery created successfully',
    data: result,
  });
});

const getAllDelivery = catAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, DeliveryFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await DeliveryServices.getAllDelivery(
    filters,
    paginationOptions
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delivery retrieved successfully',
    meta: result?.meta,
    data: result?.data,
  });
});

const getSingleDelivery = catAsync(async (req: Request, res: Response) => {
  const decoded = jwt.decode(req.headers.authorization as string) as JwtPayload;
  const result = await DeliveryServices.getSingleDelivery(decoded.id);

  sendResponse<IDelivery | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delivery Fetched successfully',
    data: result,
  });
});

const updateDelivery = catAsync(async (req: Request, res: Response) => {
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

  const result = await DeliveryServices.updateDelivery(decoded.id, updatedData);

  sendResponse<IDelivery | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delivery updated successfully',
    data: result,
  });
});

const deleteDelivery = catAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await DeliveryServices.deleteDelivery(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delivery deleted successfully',
    data: result,
  });
});

export const DeliveryController = {
  deleteDelivery,
  createDelivery,
  updateDelivery,
  getAllDelivery,
  getSingleDelivery,
};
